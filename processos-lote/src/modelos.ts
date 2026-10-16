/**
 * Modelos salvos de lote: os parametros de um lote (tipo, nivel, hipotese, pausa) com um nome, para o usuario
 * reaplicar sem escolher tudo de novo. Nunca as linhas: o modelo e a forma do lote, nao o conteudo.
 *
 * Uma chave por modelo (`lote/modelos/<host|login>/<id>`), como no `RepositorioLote`: apagar ou renomear um nao
 * reescreve os outros, e um registro corrompido so some da lista (nunca derruba a tela de configuracao).
 */

import type { Area } from "@comum/armazenamento/area";
import { normalizarTexto } from "@comum/texto";
import type { Parametros } from "./repositorio";

/** Acoes depois da criacao guardadas no modelo. Preenchido na Task 21; aqui so o tipo. */
export interface PosAcoes {
  marcador?: { id: string; nome: string; texto: string };
  acompanhar?: { grupo: string; nomeGrupo: string; observacao: string };
  bloco?: { id: string; descricao: string };
}

export interface ModeloLote {
  id: string;
  nome: string;
  criadoEm: number;
  parametros: Parametros;
  posAcoes?: PosAcoes;
}

export const LIMITE_NOME_MODELO = 80;

/** Erro de uso (nome invalido ou repetido): a mensagem vai direto para o usuario. */
export class ErroModelo extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ErroModelo";
  }
}

const ehObjeto = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const texto = (v: unknown): string => (typeof v === "string" ? v : "");

/**
 * So os campos de `Parametros`, copiados um a um: quem chama pode passar um objeto maior (com linhas, por
 * exemplo) e nada alem disto e gravado. Devolve null quando o essencial nao fecha.
 */
function lerParametros(p: unknown): Parametros | null {
  if (!ehObjeto(p) || typeof p.idTipo !== "string" || !p.idTipo) return null;
  if (p.nivelAcesso !== "0" && p.nivelAcesso !== "1") return null;
  if (typeof p.pausa !== "number" || !Number.isFinite(p.pausa)) return null;
  return {
    idTipo: p.idTipo,
    nomeTipo: texto(p.nomeTipo),
    nivelAcesso: p.nivelAcesso,
    hipoteseLegal: texto(p.hipoteseLegal),
    nomeHipotese: texto(p.nomeHipotese),
    pausa: p.pausa,
  };
}

/** O id vem da CHAVE (nao do valor gravado): e por ela que renomear e apagar acham o registro. */
function lerModelo(id: string, v: unknown): ModeloLote | null {
  if (!ehObjeto(v) || typeof v.nome !== "string" || !v.nome.trim()) return null;
  const parametros = lerParametros(v.parametros);
  if (!parametros) return null;
  const criadoEm = typeof v.criadoEm === "number" && Number.isFinite(v.criadoEm) ? v.criadoEm : 0;
  const m: ModeloLote = { id, nome: v.nome, criadoEm, parametros };
  if (ehObjeto(v.posAcoes)) m.posAcoes = v.posAcoes as PosAcoes;
  return m;
}

function validarNome(nome: string): string {
  const n = typeof nome === "string" ? nome.trim() : "";
  if (!n) throw new ErroModelo("Informe o nome do modelo.");
  if (n.length > LIMITE_NOME_MODELO) throw new ErroModelo(`O nome do modelo pode ter no máximo ${LIMITE_NOME_MODELO} caracteres.`);
  return n;
}

let sequencia = 0;
const novoId = (agora: number): string => `${agora.toString(36)}-${(sequencia++).toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Os modelos de um `host|login`. Escritas desta instancia em fila (o "mesmo nome substitui" e um
 * read-modify-write: sem a fila, dois `salvar` simultaneos do mesmo nome criariam dois modelos). Outra aba nao e
 * serializada, como no `RepositorioLote`.
 */
export class RepositorioModelos {
  private readonly prefixo: string;
  private fila: Promise<unknown> = Promise.resolve();
  constructor(
    private readonly area: Area,
    escopo: string,
    private readonly agora: () => number = Date.now,
  ) {
    const i = escopo.indexOf("|");
    if (!(i > 0 && i < escopo.length - 1)) throw new Error(`escopo invalido (esperado host|login): "${escopo}"`);
    this.prefixo = `lote/modelos/${escopo}/`;
  }

  private enfileirar<T>(tarefa: () => Promise<T>): Promise<T> {
    const r = this.fila.then(tarefa, tarefa);
    this.fila = r.catch(() => undefined);
    return r;
  }

  /** Por nome, sem acento nem caixa. Registro que nao fecha e ignorado (nunca lanca por dado ruim). */
  async listar(): Promise<ModeloLote[]> {
    // Chave com "/" depois do prefixo e de outro escopo (login com "/") ou lixo: fica de fora.
    const minha = (k: string) =>
      k.startsWith(this.prefixo) && k.length > this.prefixo.length && !k.slice(this.prefixo.length).includes("/");
    let dados: Record<string, unknown>;
    if (this.area.chaves) {
      const ks = (await this.area.chaves()).filter(minha);
      dados = ks.length ? await this.area.obter(ks) : {};
    } else {
      dados = await this.area.obter(null);
    }
    const saida: ModeloLote[] = [];
    for (const [k, v] of Object.entries(dados)) {
      if (!minha(k)) continue;
      const m = lerModelo(k.slice(this.prefixo.length), v);
      if (m) saida.push(m);
    }
    return saida.sort((a, b) => normalizarTexto(a.nome).localeCompare(normalizarTexto(b.nome), "pt-BR") || a.id.localeCompare(b.id));
  }

  /** Mesmo nome (sem acento/caixa) substitui o modelo existente, mantendo o id dele. */
  salvar(nome: string, parametros: Parametros, posAcoes?: PosAcoes): Promise<ModeloLote> {
    return this.enfileirar(async () => {
      const n = validarNome(nome);
      const p = lerParametros(parametros);
      if (!p) throw new ErroModelo("Escolha o tipo de processo antes de salvar o modelo.");
      const chave = normalizarTexto(n);
      const existente = (await this.listar()).find((m) => normalizarTexto(m.nome) === chave);
      const agora = this.agora();
      const m: ModeloLote = { id: existente?.id ?? novoId(agora), nome: n, criadoEm: agora, parametros: p };
      if (posAcoes) m.posAcoes = structuredClone(posAcoes);
      await this.area.gravar({ [this.prefixo + m.id]: m });
      return m;
    });
  }

  /** null se o modelo nao existe mais; nome de OUTRO modelo lanca `ErroModelo`. */
  renomear(id: string, nome: string): Promise<ModeloLote | null> {
    return this.enfileirar(async () => {
      const n = validarNome(nome);
      const todos = await this.listar();
      const atual = todos.find((m) => m.id === id);
      if (!atual) return null;
      const chave = normalizarTexto(n);
      if (todos.some((m) => m.id !== id && normalizarTexto(m.nome) === chave))
        throw new ErroModelo("Já existe outro modelo com este nome.");
      const novo = { ...atual, nome: n };
      await this.area.gravar({ [this.prefixo + id]: novo });
      return novo;
    });
  }

  /** false quando nao havia o modelo. */
  apagar(id: string): Promise<boolean> {
    return this.enfileirar(async () => {
      if (typeof id !== "string" || !id || id.includes("/")) return false;
      const k = this.prefixo + id;
      if (!(k in (await this.area.obter(k)))) return false;
      await this.area.remover(k);
      return true;
    });
  }
}
