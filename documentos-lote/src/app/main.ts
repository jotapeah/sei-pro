/**
 * Entrada de html/documentos-lote.html. Provisorio: monta so um titulo; as telas entram nas tarefas seguintes
 * (a Tarefa 11 reescreve este arquivo).
 */
import { h } from "@comum/ui/dom";

document.documentElement.dataset.modo = "modal";
document.getElementById("app")?.append(h("p", {}, "Documentos em Lote"));
