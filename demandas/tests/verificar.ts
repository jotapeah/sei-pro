import { resumo } from "./util";
import { verificarAndaime } from "./verificar-andaime";
import { verificarOperacoes } from "./verificar-operacoes";
import { verificarSituacao } from "./verificar-situacao";
import { verificarValidacao } from "./verificar-validacao";

verificarAndaime();
verificarSituacao();
await verificarValidacao();
await verificarOperacoes();
resumo();
