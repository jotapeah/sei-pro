import { resumo } from "./util";
import { verificarApp } from "./verificar-app";
import { verificarLinhas } from "./verificar-linhas";
import { verificarModelos } from "./verificar-modelos";
import { verificarPagina } from "./verificar-pagina";
import { verificarPrevia } from "./verificar-previa";
import { verificarRepositorio } from "./verificar-repositorio";
import { verificarSei } from "./verificar-sei";

verificarLinhas();
verificarPrevia();
await verificarRepositorio();
await verificarModelos();
await verificarSei();
await verificarPagina();
await verificarApp();
resumo();
