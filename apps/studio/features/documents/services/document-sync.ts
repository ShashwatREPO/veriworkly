"use client";

import { getDocumentDefinition } from "@/features/documents/core/registry";
import type { DocumentType } from "@/features/documents/core/document-types";
import type { BaseDocument } from "@/features/documents/core/types";
import type { DocumentCollection } from "@/types/document";

import { LocalStorageService } from "./local-storage-service";
import { DocumentSyncService, type SyncResult } from "./document-sync-service";
import { SyncEngine, type SyncTelemetry } from "./sync-engine";

export type { SyncResult, SyncTelemetry };

export const DOCUMENT_STORAGE_UPDATED_EVENT = "veriworkly:docs-storage-updated";

const ACTIVE_KEY = "veriworkly:docs:v2:active";

function collectionKey(type: DocumentType) {
  return `veriworkly:docs:v2:${type.toLowerCase()}`;
}

function parseDocumentCollection(
  type: DocumentType,
  input: unknown,
): DocumentCollection<BaseDocument> {
  const parseItem = getDocumentDefinition(type).parse;
  const raw =
    typeof input === "object" && input !== null && "items" in input
      ? (input as { version?: unknown; items?: unknown })
      : {};
  const itemsRaw =
    typeof raw.items === "object" && raw.items !== null
      ? (raw.items as Record<string, unknown>)
      : {};

  const entries = Object.entries(itemsRaw)
    .map(([id, value]) => [id, parseItem(value)] as const)
    .filter((entry): entry is readonly [string, BaseDocument] => Boolean(entry[1]));

  return {
    version: typeof raw.version === "number" ? raw.version : 2,
    items: Object.fromEntries(entries),
  };
}

function createDocumentSyncService(type: DocumentType) {
  const storage = new LocalStorageService<BaseDocument>({
    collectionKey: collectionKey(type),
    activeIdKey: ACTIVE_KEY,
    updatedEventName: DOCUMENT_STORAGE_UPDATED_EVENT,
    parseItem: (input) => getDocumentDefinition(type).parse(input),
    parseCollection: (input) => parseDocumentCollection(type, input),
  });

  return new DocumentSyncService<BaseDocument>({
    documentType: type,
    localStorage: storage,
    updatedEventName: DOCUMENT_STORAGE_UPDATED_EVENT,
    parseItem: (input) => getDocumentDefinition(type).parse(input),
    getDocumentTitle: (item) => item.title,
  });
}

const documentSyncServices: Record<DocumentType, DocumentSyncService<BaseDocument>> = {
  RESUME: createDocumentSyncService("RESUME"),
  COVER_LETTER: createDocumentSyncService("COVER_LETTER"),
  FORMAL_LETTER: createDocumentSyncService("FORMAL_LETTER"),
  INVOICE: createDocumentSyncService("INVOICE"),
};

function getService(type: DocumentType) {
  return documentSyncServices[type];
}

export async function syncDocumentNow(type: DocumentType, id: string): Promise<SyncResult> {
  return getService(type).syncNow(id);
}

export function keepDocumentLocalOnly(type: DocumentType, id: string): SyncResult {
  return getService(type).keepLocalOnly(id);
}

export async function resolveDocumentConflictUseLocal(type: DocumentType, id: string) {
  return getService(type).resolveConflictUseLocal(id);
}

export async function resolveDocumentConflictUseCloud(type: DocumentType, id: string) {
  return getService(type).resolveConflictUseCloud(id);
}

export function getDocumentSyncTelemetry(type: DocumentType, id: string): SyncTelemetry {
  return SyncEngine.getTelemetry(id);
}

export function getDocumentSyncTelemetryByDocs(
  docs: Array<{ id: string; type: DocumentType }>,
): Record<string, SyncTelemetry> {
  return docs.reduce<Record<string, SyncTelemetry>>((result, doc) => {
    result[doc.id] = getDocumentSyncTelemetry(doc.type, doc.id);
    return result;
  }, {});
}
