import { areaMemoria } from "../src/armazenamento/area";
import { MotorTextoPadrao, nomeDaTrava, type StatusSync, textoDoErro } from "../src/sincronia/motor";
import { adaptadorTeste, destinoTeste, type EnvTeste, item, itensDoTexto, repoTeste, textoDeOutro } from "./adaptadorTeste";
import { checar, secao, tique } from "./util";

const DIA = 86_400_000;

function montar(
  o: {
    remoto?: string | null;
    teto?: number;
    aviso?: number;
    releituras?: number;
    intervaloPuxar?: number;
    diasLapide?: number;
    agora?: number;
    permitido?: () => Promise<boolean>;
  } = {},
) {
  const area = areaMemoria();
  const repo = repoTeste();
  const destino = destinoTeste(o.remoto ?? null);
  let agora = o.agora ?? 10_000_000;
  let ocupado = false;
  const travas: string[] = [];
  const motor = new MotorTextoPadrao<EnvTeste>({
    adaptador: adaptadorTeste(repo, { teto: o.teto, aviso: o.aviso, diasLapide: o.diasLapide }),
    destino,
    area,
    travar: async (nome, fn) => {
      travas.push(nome);
      return ocupado ? null : fn();
    },
    agora: () => agora,
    atrasoEnvio: 10,
    releituras: o.releituras,
    intervaloPuxar: o.intervaloPuxar,
    permitido: o.permitido,
  });
  return {
    area,
    repo,
    destino,
    motor,
    travas,
    avancar: (ms: number) => {
      agora += ms;
    },
    ocupar: (v: boolean) => {
      ocupado = v;
    },
  };
}

const ids = (l: Array<{ id: string }>) =>
  l
    .map((i) => i.id)
    .sort()
    .join();

export async function verificarMotorTexto(): Promise<void> {
  secao("motor generico: primeira rodada e intervalo");
  const m = montar();
  m.repo.por("a1", "um", 100);
  const s1 = await m.motor.sincronizar();
  checar(
    "sem texto no SEI: cria (e rele uma vez antes de gravar)",
    m.destino.gravadas === 1 && m.destino.lidas === 2 && s1.estado === "ok" && !s1.pendente,
    { s1, lidas: m.destino.lidas },
  );
  await m.motor.sincronizar();
  checar("logo depois, sem mudanca: nem le", m.destino.lidas === 2);
  m.avancar(6 * 60_000);
  await m.motor.sincronizar();
  checar("depois de 5 min le, e sem diferenca nao rele nem regrava", m.destino.lidas === 3 && m.destino.gravadas === 1);
  const mi = montar({ intervaloPuxar: 2 * 60_000 });
  await mi.motor.sincronizar();
  const antes = mi.destino.lidas;
  mi.avancar(3 * 60_000);
  await mi.motor.sincronizar();
  checar("intervalo configuravel (2 min): puxa de novo depois de 3 min", mi.destino.lidas > antes);
  checar(
    "trava por texto: seipro-<modulo>-sync|<chave de status> (o nome dos Favoritos nao muda)",
    m.travas[0] === "seipro-teste-sync|teste/sync/tp/a" && nomeDaTrava("favoritos", "k") === "seipro-favoritos-sync|k",
    m.travas,
  );

  secao("motor generico: mescla e releitura antes de gravar");
  const m2 = montar({ remoto: await textoDeOutro([item("b1", 50)]) });
  m2.repo.por("a1", "um", 100);
  m2.destino.aoLer = async (n) => {
    if (n === 2) m2.destino.html = await textoDeOutro([item("b1", 50), item("b2", 60)]);
  };
  await m2.motor.sincronizar();
  checar(
    "o colega gravou entre a leitura e a gravacao: a nova versao entra na mescla",
    m2.repo.itens.has("b2") && ids(await itensDoTexto(m2.destino.html)) === "a1,b1,b2",
    await itensDoTexto(m2.destino.html),
  );
  checar("e grava uma vez so, depois de reler de novo", m2.destino.gravadas === 1 && m2.destino.lidas === 3, m2.destino);
  const m3 = montar({ remoto: await textoDeOutro([item("b1", 50)]) });
  m3.repo.por("a1", "um", 100);
  const lista: ReturnType<typeof item>[] = [];
  m3.destino.aoLer = async (n) => {
    lista.push(item(`b${n}`, 50 + n));
    m3.destino.html = await textoDeOutro([...lista]);
  };
  const s3 = await m3.motor.sincronizar();
  checar(
    "texto mudando a cada leitura: depois de 3 releituras nao grava por cima e fica pendente",
    m3.destino.gravadas === 0 && m3.destino.lidas === 4 && s3.estado === "erro" && s3.pendente && /mudou/.test(s3.mensagem ?? ""),
    s3,
  );
  checar("o que o colega gravou ate a ultima mescla ja esta aqui", m3.repo.itens.has("b3"));
  m3.destino.aoLer = undefined;
  const s3b = await m3.motor.sincronizar();
  checar(
    "na rodada seguinte, com o texto parado, grava tudo",
    s3b.estado === "ok" && ids(await itensDoTexto(m3.destino.html)) === "a1,b1,b2,b3,b4",
    await itensDoTexto(m3.destino.html),
  );
  const m4 = montar({ releituras: 0 });
  m4.repo.por("a1", "um", 100);
  await m4.motor.sincronizar();
  checar("releituras: 0 le uma vez so (o modo dos Favoritos)", m4.destino.lidas === 1 && m4.destino.gravadas === 1);
  const m5 = montar({ remoto: await textoDeOutro([item("b1", 50)]) });
  await m5.motor.sincronizar();
  checar("igual depois de mesclar: nao regrava", m5.destino.gravadas === 0 && m5.repo.itens.has("b1"));

  secao("motor generico: texto invalido, mais novo, teto, aviso e permissao");
  const m6 = montar({ remoto: "<p>Um colega apagou tudo e escreveu isto</p>" });
  m6.repo.por("a1", "um", 100);
  const s6 = await m6.motor.sincronizar();
  checar(
    "invalido: regrava a partir do local e avisa",
    m6.destino.gravadas === 1 && s6.estado === "ok" && /regrav/.test(s6.mensagem ?? ""),
    s6,
  );
  checar("nada local some", m6.repo.itens.has("a1"));
  const m7 = montar({ remoto: await textoDeOutro([item("x", 1)], "maria") });
  m7.repo.por("a1", "um", 100);
  const s7 = await m7.motor.sincronizar();
  checar(
    "texto de outro escopo: invalido, com o motivo na mensagem",
    m7.destino.gravadas === 1 && /outro dono/.test(s7.mensagem ?? ""),
    s7,
  );
  const m8 = montar({ remoto: await textoDeOutro([], "pedro", 2) });
  m8.repo.por("a1", "um", 100);
  const s8 = await m8.motor.sincronizar();
  checar(
    "versao mais nova: nao toca e pede para atualizar",
    m8.destino.gravadas === 0 && s8.estado === "erro" && /mais nova/.test(s8.mensagem ?? ""),
    s8,
  );
  const m9 = montar({ teto: 100 });
  m9.repo.por("a1", "um", 100);
  const s9 = await m9.motor.sincronizar();
  checar(
    "acima do teto: nao grava e explica",
    m9.destino.gravadas === 0 && s9.estado === "erro" && /grandes demais/.test(s9.mensagem ?? ""),
    s9,
  );
  const m10 = montar({ aviso: 10 });
  m10.repo.por("a1", "um", 100);
  const s10 = await m10.motor.sincronizar();
  checar("acima do aviso: grava e avisa", m10.destino.gravadas === 1 && /perto do limite/.test(s10.mensagem ?? ""), s10);
  const m11 = montar({ permitido: async () => false });
  m11.repo.por("a1", "um", 100);
  const s11 = await m11.motor.sincronizar();
  checar("desligado no meio da rodada: nao grava", m11.destino.gravadas === 0 && s11.estado === "nunca" && !s11.pendente, s11);

  secao("motor generico: erros, trava e envio agendado");
  const m12 = montar();
  m12.destino.erro = { codigo: "SEI_SESSAO_EXPIRADA", message: "Sessão expirada" };
  await m12.motor.marcarPendente();
  const s12 = await m12.motor.sincronizar();
  checar("sessao expirada: erro, pendencia mantida", s12.estado === "erro" && s12.pendente && /Sess/.test(s12.mensagem ?? ""), s12);
  const m13 = montar();
  m13.destino.erro = { codigo: "SEI_ACAO_INDISPONIVEL", message: "sem menu" };
  const s13 = await m13.motor.sincronizar();
  checar("sem permissao de Texto Padrao: indisponivel", s13.estado === "indisponivel" && (s13.indisponivelAte ?? 0) > 0, s13);
  m13.avancar(60 * 60_000);
  await m13.motor.sincronizar();
  checar("e nao tenta de novo no mesmo dia", m13.destino.lidas === 1);
  await m13.motor.sincronizar({ forcar: true });
  checar("salvo se o usuario pedir", m13.destino.lidas === 2);
  checar("erro qualquer: a mensagem dele", textoDoErro(new Error("falhou")).mensagem === "falhou");
  const m14 = montar();
  m14.ocupar(true);
  await m14.motor.sincronizar({ forcar: true });
  checar("outra aba sincronizando: esta nao faz nada", m14.destino.lidas === 0);
  m14.ocupar(false);
  void m14.motor.agendarEnvio();
  await m14.motor.agendarEnvio();
  checar(
    "mudanca local marca pendente na hora",
    ((await m14.area.obter("teste/sync/tp/a"))["teste/sync/tp/a"] as StatusSync | undefined)?.pendente === true,
  );
  await tique(60);
  checar("duas mudancas seguidas: um envio so", m14.destino.gravadas === 1 && m14.destino.lidas === 2, m14.destino);

  secao("motor generico: lapides com prazo por escopo");
  const agora = 400 * DIA;
  const remotoVivo = await textoDeOutro([item("x", agora - 130 * DIA)]);
  const u = montar({ remoto: remotoVivo, diasLapide: 180, agora });
  u.repo.por("x", "x", agora - 200 * DIA);
  u.repo.remover("x", agora - 120 * DIA);
  await u.motor.sincronizar();
  const noTexto = (await itensDoTexto(u.destino.html)).find((i) => i.id === "x");
  checar("unidade (180 dias): a lapide de 120 dias vai no texto", noTexto?.removidoEm === agora - 120 * DIA, noTexto);
  const outro = repoTeste();
  outro.por("x", "x", agora - 130 * DIA, "B");
  outro.importar({ formato: "teste", versao: 1, dono: "pedro", itens: await itensDoTexto(u.destino.html) });
  checar("e o computador que ainda tinha o item vivo recebe a remocao (nao ressuscita)", outro.itens.get("x")?.removidoEm !== undefined);
  const p = montar({ remoto: remotoVivo, diasLapide: 90, agora });
  p.repo.por("x", "x", agora - 200 * DIA);
  p.repo.remover("x", agora - 120 * DIA);
  await p.motor.sincronizar();
  checar(
    "pessoal (90 dias): a mesma lapide ja nao viaja",
    !(await itensDoTexto(p.destino.html)).some((i) => i.id === "x"),
    await itensDoTexto(p.destino.html),
  );
}
