import { resumo } from "./util";
import { verificarAplicar } from "./verificar-aplicar";
import { verificarBaseCss } from "./verificar-base-css";
import { verificarDocumentos } from "./verificar-documentos";

verificarAplicar();
verificarBaseCss();
await verificarDocumentos();
resumo();
