import { resumo } from "./util";
import { verificarDocumentos } from "./verificar-documentos";
import { verificarFila } from "./verificar-fila";
import { verificarPagina } from "./verificar-pagina";
import { verificarRepositorio } from "./verificar-repositorio";

await verificarPagina();
verificarDocumentos();
verificarFila();
await verificarRepositorio();
resumo();
