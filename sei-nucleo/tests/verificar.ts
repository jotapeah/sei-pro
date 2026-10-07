import { verificarBase } from "./verificar-base";
import { verificarDominio } from "./verificar-dominio";
import { verificarHistorico } from "./verificar-historico";
import { verificarPrivacidade } from "./verificar-privacidade";
import { verificarTextoPadrao } from "./verificar-texto-padrao";
import { verificarTextoPadraoConferencia } from "./verificar-texto-padrao-conferencia";
import { resumo } from "./util";

await verificarBase();
await verificarDominio();
await verificarHistorico();
await verificarPrivacidade();
await verificarTextoPadrao();
await verificarTextoPadraoConferencia();
resumo();
