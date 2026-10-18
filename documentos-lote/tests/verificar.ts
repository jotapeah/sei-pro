import { resumo } from "./util";
import { verificarConstantes } from "./verificar-constantes";
import { verificarPagina } from "./verificar-pagina";

verificarConstantes();
await verificarPagina();
resumo();
