import { resumo } from "./util";
import { verificarAplicar } from "./verificar-aplicar";
import { verificarBaseCss, verificarCascaCss } from "./verificar-base-css";
import { verificarDicas } from "./verificar-dicas";
import { verificarDocumentos } from "./verificar-documentos";
import { verificarIcones } from "./verificar-icones";
import { verificarSecao } from "./verificar-secao";

verificarAplicar();
verificarBaseCss();
verificarCascaCss();
verificarIcones();
verificarDicas();
await verificarDocumentos();
await verificarSecao();
resumo();
