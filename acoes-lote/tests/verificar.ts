import { resumo } from "./util";
import { verificarDocumentos } from "./verificar-documentos";
import { verificarPagina } from "./verificar-pagina";

await verificarPagina();
verificarDocumentos();
resumo();
