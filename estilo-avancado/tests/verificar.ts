import { resumo } from "./util";
import { verificarAplicar } from "./verificar-aplicar";
import { verificarBaseCss, verificarCascaCss } from "./verificar-base-css";
import { verificarDicas } from "./verificar-dicas";
import { verificarDocumentos } from "./verificar-documentos";
import { verificarIcones } from "./verificar-icones";
import { verificarRespiro } from "./verificar-respiro";
import { verificarSecao } from "./verificar-secao";

verificarAplicar();
verificarBaseCss();
verificarCascaCss();
verificarIcones();
verificarDicas();
verificarRespiro();
await verificarDocumentos();
await verificarSecao();
resumo();
