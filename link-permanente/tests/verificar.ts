import { resumo } from "./util";
import { verificarApp } from "./verificar-app";
import { verificarModelo } from "./verificar-modelo";
import { verificarPagina } from "./verificar-pagina";

verificarModelo();
await verificarPagina();
await verificarApp();
resumo();
