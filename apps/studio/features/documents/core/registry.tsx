import type { BaseDocument } from "./types";
import type { DocumentType } from "./document-types";
import type { DocumentDefinition } from "./definition";

import { templateCatalogByType } from "./template-catalog";

const EmptyEditor = () => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
      <h3 className="text-xl font-bold">Editor starting from scratch</h3>
      <p className="text-muted-foreground text-sm">Feature components have been removed.</p>
    </div>
  );
};

function createDefaultDocument(id: string, type: DocumentType, defaultTemplateId: string): BaseDocument {
  const now = new Date().toISOString();
  return {
    id,
    type,
    title: `Untitled ${type.toLowerCase().replace("_", " ")}`,
    templateId: defaultTemplateId,
    content: {},
    updatedAt: now,
    sync: {
      enabled: false,
      status: "local-only",
      cloudDocumentId: null,
      lastSyncedAt: null,
      revision: 0,
    },
  };
}

function parseDocument(input: unknown, type: DocumentType): BaseDocument | null {
  if (typeof input !== "object" || input === null) return null;
  const raw = input as Partial<BaseDocument>;
  if (typeof raw.id !== "string") return null;

  return {
    id: raw.id,
    type: type,
    title: raw.title || `Untitled ${type.toLowerCase().replace("_", " ")}`,
    templateId: raw.templateId || "",
    content: raw.content ?? {},
    updatedAt: raw.updatedAt || new Date().toISOString(),
    sync: {
      enabled: Boolean(raw.sync?.enabled),
      status: raw.sync?.status || "local-only",
      cloudDocumentId: raw.sync?.cloudDocumentId || null,
      lastSyncedAt: raw.sync?.lastSyncedAt || null,
      revision: typeof raw.sync?.revision === "number" ? raw.sync?.revision : 0,
    },
  };
}

export const documentRegistry: Record<DocumentType, DocumentDefinition> = {
  RESUME: {
    type: "RESUME",
    label: "Resume",
    icon: "FileText",
    defaultTemplateId: "executive-clarity",
    exportFormats: ["pdf", "docx", "html", "markdown", "json", "txt"],
    templates: templateCatalogByType.RESUME,
    createDefault: (id) => createDefaultDocument(id, "RESUME", "executive-clarity"),
    parse: (value) => parseDocument(value, "RESUME"),
    Editor: EmptyEditor,
  },

  COVER_LETTER: {
    type: "COVER_LETTER",
    label: "Cover Letter",
    icon: "Mail",
    defaultTemplateId: "cover-letter-classic",
    exportFormats: ["pdf", "docx", "html", "markdown", "txt", "json"],
    templates: templateCatalogByType.COVER_LETTER,
    createDefault: (id) => createDefaultDocument(id, "COVER_LETTER", "cover-letter-classic"),
    parse: (value) => parseDocument(value, "COVER_LETTER"),
    Editor: EmptyEditor,
  },

  FORMAL_LETTER: {
    type: "FORMAL_LETTER",
    label: "Formal Letter",
    icon: "ScrollText",
    defaultTemplateId: "formal-letter-modern",
    exportFormats: ["pdf", "docx", "markdown", "txt", "json"],
    templates: templateCatalogByType.FORMAL_LETTER,
    createDefault: (id) => createDefaultDocument(id, "FORMAL_LETTER", "formal-letter-modern"),
    parse: (value) => parseDocument(value, "FORMAL_LETTER"),
    Editor: EmptyEditor,
  },

  INVOICE: {
    type: "INVOICE",
    label: "Invoice",
    icon: "ReceiptText",
    defaultTemplateId: "invoice-clean",
    exportFormats: ["pdf", "json", "txt"],
    templates: templateCatalogByType.INVOICE,
    createDefault: (id) => createDefaultDocument(id, "INVOICE", "invoice-clean"),
    parse: (value) => parseDocument(value, "INVOICE"),
    Editor: EmptyEditor,
  },
};

export function getDocumentDefinition(type: DocumentType) {
  return documentRegistry[type];
}
