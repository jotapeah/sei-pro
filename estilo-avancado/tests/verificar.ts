import { resumo } from "./util";
import { verificarAplicar } from "./verificar-aplicar";
import { verificarBaseCss, verificarCascaCss } from "./verificar-base-css";
import { verificarDocumentos } from "./verificar-documentos";
import { verificarSecao } from "./verificar-secao";

verificarAplicar();
verificarBaseCss();
verificarCascaCss();
await verificarDocumentos();
await verificarSecao();
resumo();
