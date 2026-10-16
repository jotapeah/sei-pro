import { resumo } from "./util";
import { verificarAppSelecao } from "./verificar-app-selecao";
import { verificarDocumentos } from "./verificar-documentos";
import { verificarExecutor } from "./verificar-executor";
import { verificarFila } from "./verificar-fila";
import { verificarPagina } from "./verificar-pagina";
import { verificarRepositorio } from "./verificar-repositorio";

await verificarPagina();
verificarDocumentos();
verificarFila();
await verificarRepositorio();
await verificarExecutor();
await verificarAppSelecao();
resumo();
