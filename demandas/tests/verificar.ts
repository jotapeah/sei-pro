import { resumo } from "./util";
import { verificarAlertas } from "./verificar-alertas";
import { verificarAndaime } from "./verificar-andaime";
import { verificarEstatisticas } from "./verificar-estatisticas";
import { verificarFiltro } from "./verificar-filtro";
import { verificarOperacoes } from "./verificar-operacoes";
import { verificarSituacao } from "./verificar-situacao";
import { verificarValidacao } from "./verificar-validacao";

verificarAndaime();
verificarSituacao();
await verificarValidacao();
await verificarOperacoes();
verificarFiltro();
verificarAlertas();
verificarEstatisticas();
resumo();
