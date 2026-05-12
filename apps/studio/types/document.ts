import type { SyncStatus } from "@/features/documents/services/sync-engine";

export interface DocumentSyncState {
  enabled: boolean;
  status: SyncStatus;
  cloudDocumentId: string | null;
  lastSyncedAt: string | null;
  revision: number;
}

export interface BaseDocumentData {
  id: string;
  updatedAt: string;
  sync: DocumentSyncState;
  templateId: string;
}

export interface DocumentCollection<T extends BaseDocumentData> {
  version: number;
  items: Record<string, T>;
}
