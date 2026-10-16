import { resumo } from "./util";
import { verificarModelo } from "./verificar-modelo";
import { verificarPagina } from "./verificar-pagina";

verificarModelo();
await verificarPagina();
resumo();
