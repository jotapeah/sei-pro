import "./fuso";
import { resumo } from "./util";
import { verificarCalendario } from "./verificar-calendario";
import { verificarDependencias } from "./verificar-dependencias";
import { verificarEscopo } from "./verificar-escopo";
import { verificarSituacao } from "./verificar-situacao";

verificarEscopo();
verificarCalendario();
verificarSituacao();
verificarDependencias();
resumo();
