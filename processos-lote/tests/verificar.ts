import { resumo } from "./util";
import { verificarLinhas } from "./verificar-linhas";
import { verificarPrevia } from "./verificar-previa";
import { verificarRepositorio } from "./verificar-repositorio";

verificarLinhas();
verificarPrevia();
await verificarRepositorio();
resumo();
