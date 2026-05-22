import type { BaseDocument, ExportFormat } from "@/features/documents/core/types";
import { downloadBlob } from "@/features/documents/export/download";
import { getDocumentFileBaseName } from "./export-file-names";

export async function exportDocumentByType(
  document: BaseDocument,
  format: ExportFormat,
): Promise<void> {
  const fileBase = getDocumentFileBaseName(document);

  if (format === "json") {
    downloadBlob(
      new Blob([JSON.stringify(document, null, 2)], { type: "application/json" }),
      `${fileBase}.json`,
    );
    return;
  }

  const txt = `Document ID: ${document.id}\nType: ${document.type}\nTitle: ${document.title}\nUpdated At: ${document.updatedAt}\n\nContent:\n${JSON.stringify(document.content, null, 2)}`;
  
  downloadBlob(
    new Blob([txt], { type: "text/plain;charset=utf-8" }),
    `${fileBase}.${format === "pdf" ? "pdf" : format === "docx" ? "docx" : format === "html" ? "html" : format === "markdown" ? "md" : "txt"}`
  );
}
