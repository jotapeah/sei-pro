import { resumo } from "./util";
import { verificarCampos } from "./verificar-campos";
import { verificarConstantes } from "./verificar-constantes";
import { verificarCsv } from "./verificar-csv";
import { verificarDestinos } from "./verificar-destinos";
import { verificarPagina } from "./verificar-pagina";

verificarConstantes();
verificarCampos();
verificarCsv();
verificarDestinos();
await verificarPagina();
resumo();
