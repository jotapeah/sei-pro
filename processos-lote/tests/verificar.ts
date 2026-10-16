import { resumo } from "./util";
import { verificarLinhas } from "./verificar-linhas";
import { verificarPagina } from "./verificar-pagina";
import { verificarPrevia } from "./verificar-previa";
import { verificarRepositorio } from "./verificar-repositorio";
import { verificarSei } from "./verificar-sei";

verificarLinhas();
verificarPrevia();
await verificarRepositorio();
await verificarSei();
await verificarPagina();
resumo();
