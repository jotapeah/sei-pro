import { resumo } from "./util";
import { verificarAplicar } from "./verificar-aplicar";
import { verificarBaseCss } from "./verificar-base-css";
import { verificarDocumentos } from "./verificar-documentos";
import { verificarSecao } from "./verificar-secao";

verificarAplicar();
verificarBaseCss();
await verificarDocumentos();
await verificarSecao();
resumo();
