import type { BaseDocument } from "@/features/documents/core/types";

function slugifyFileName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getDocumentFileBaseName(document: BaseDocument): string {
  return slugifyFileName(document.title) || document.type.toLowerCase();
}
