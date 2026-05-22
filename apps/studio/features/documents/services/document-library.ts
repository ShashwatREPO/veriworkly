"use client";

import {
  listDocuments,
  loadDocumentById,
} from "@/features/documents/services/document-workspace-service";
import type { DocumentType } from "@/features/documents/core/document-types";
import type { BaseDocument, DocumentSyncState } from "@/features/documents/core/types";
import { getDocumentDefinition } from "@/features/documents/core/registry";
import { DOCUMENT_STORAGE_UPDATED_EVENT } from "./document-sync";

export type DocumentLibraryItem = {
  source: "document";
  id: string;
  type: DocumentType;
  title: string;
  description: string;
  templateId: string;
  templateName: string;
  templateDescription: string;
  previewImage: string;
  updatedAt: string;
  sync: DocumentSyncState;
};

export type DocumentLibrarySnapshot = {
  docs: DocumentLibraryItem[];
  counts: Record<DocumentType, number>;
  key: string;
};

const EMPTY_COUNTS: Record<DocumentType, number> = {
  RESUME: 0,
  COVER_LETTER: 0,
  FORMAL_LETTER: 0,
  INVOICE: 0,
};

export const DOCUMENT_LIBRARY_SERVER_SNAPSHOT: DocumentLibrarySnapshot = {
  docs: [],
  counts: EMPTY_COUNTS,
  key: "server",
};

let snapshotCache: DocumentLibrarySnapshot = {
  docs: [],
  counts: EMPTY_COUNTS,
  key: "",
};

export function subscribeToDocumentLibrary(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(DOCUMENT_STORAGE_UPDATED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(DOCUMENT_STORAGE_UPDATED_EVENT, onStoreChange);
  };
}

export function getDocumentLibrarySnapshot(
  activeType: DocumentType | "ALL" = "ALL",
  refreshKey = 0,
): DocumentLibrarySnapshot {
  if (typeof window === "undefined") {
    return DOCUMENT_LIBRARY_SERVER_SNAPSHOT;
  }

  const storage = window.localStorage;
  const storageKey = [
    storage.getItem("veriworkly:docs:v2:active") ?? "",
    refreshKey.toString(),
  ].join("::");
  const nextKey = `${activeType}::${storageKey}`;

  if (nextKey !== snapshotCache.key) {
    const documentDocs = listDocuments()
      .map((document) => loadDocumentById(document.type, document.id))
      .filter((document): document is BaseDocument => Boolean(document))
      .map(mapDocumentToLibraryItem);
    const allDocs = documentDocs.sort(
      (left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
    );

    const counts: Record<DocumentType, number> = { ...EMPTY_COUNTS };
    allDocs.forEach((doc) => {
      counts[doc.type] += 1;
    });

    snapshotCache = {
      docs: activeType === "ALL" ? allDocs : allDocs.filter((doc) => doc.type === activeType),
      counts,
      key: nextKey,
    };
  }

  return snapshotCache;
}

function describeDocument(document: BaseDocument): string {
  if (document.type === "RESUME") return "Resume profile data";
  if (document.type === "COVER_LETTER") return "Cover letter";
  if (document.type === "FORMAL_LETTER") return "Formal correspondence";
  if (document.type === "INVOICE") return "Invoice document";

  return "Document";
}

export function mapDocumentToLibraryItem(document: BaseDocument): DocumentLibraryItem {
  const definition = getDocumentDefinition(document.type);
  const template =
    definition.templates.find((item) => item.id === document.templateId) ?? definition.templates[0];

  return {
    source: "document",
    id: document.id,
    type: document.type,
    title: document.title,
    description: describeDocument(document),
    templateId: document.templateId,
    templateName: template?.name ?? definition.label,
    templateDescription: template?.description ?? definition.label,
    previewImage: template?.previewImage ?? "",
    updatedAt: document.updatedAt,
    sync: document.sync,
  };
}

export function formatRelative(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "recently";

  const diffMs = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "just now";
  if (diffMs < hour) return `${Math.max(1, Math.round(diffMs / minute))}m ago`;
  if (diffMs < day) return `${Math.round(diffMs / hour)}h ago`;
  if (diffMs < 7 * day) return `${Math.round(diffMs / day)}d ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
