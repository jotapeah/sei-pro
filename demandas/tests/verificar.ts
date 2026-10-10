import { resumo } from "./util";
import { verificarAndaime } from "./verificar-andaime";
import { verificarSituacao } from "./verificar-situacao";
import { verificarValidacao } from "./verificar-validacao";

verificarAndaime();
verificarSituacao();
await verificarValidacao();
resumo();
