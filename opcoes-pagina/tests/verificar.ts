import { resumo } from "./util";
import { verificarArmazenamento } from "./verificar-armazenamento";
import { verificarBusca } from "./verificar-busca";
import { verificarConfig } from "./verificar-config";
import { verificarRender } from "./verificar-render";
import { verificarSchema } from "./verificar-schema";

verificarSchema();
verificarConfig();
verificarRender();
verificarBusca();
await verificarArmazenamento();
resumo();
