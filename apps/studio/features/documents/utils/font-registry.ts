import type { DocumentFontFamilyId } from "@/types/document-font";

export const DEFAULT_DOCUMENT_FONT_FAMILY: DocumentFontFamilyId = "geist";

type DocumentFontScope = "editor" | "on-demand";

export interface DocumentFontRegistryEntry {
  id: DocumentFontFamilyId;
  label: string;
  primaryFamily: string;
  fallbackStack: string;
  stylesheetHref: string;
  scope: DocumentFontScope;
}

const documentFontDefinitions: DocumentFontRegistryEntry[] = [
  {
    id: "geist",
    label: "Geist Sans",
    primaryFamily: "Geist",
    fallbackStack: "Inter, 'Segoe UI', Arial, sans-serif",
    stylesheetHref:
      "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap",
    scope: "editor",
  },
  {
    id: "serif",
    label: "Merriweather Serif",
    primaryFamily: "Merriweather",
    fallbackStack: "Georgia, Cambria, serif",
    stylesheetHref:
      "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
    scope: "editor",
  },
  {
    id: "modern",
    label: "Manrope Grotesk",
    primaryFamily: "Manrope",
    fallbackStack: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    stylesheetHref:
      "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
    scope: "editor",
  },
];

const DOCUMENT_FONT_ALIAS_MAP: Record<string, DocumentFontFamilyId> = {
  mono: "geist",
};

const DOCUMENT_FONT_ID_SET = new Set<DocumentFontFamilyId>(
  documentFontDefinitions.map((font) => font.id),
);

export const DOCUMENT_FONT_REGISTRY: Record<DocumentFontFamilyId, DocumentFontRegistryEntry> =
  Object.fromEntries(documentFontDefinitions.map((font) => [font.id, font])) as Record<
    DocumentFontFamilyId,
    DocumentFontRegistryEntry
  >;

export function isDocumentFontFamilyId(value: string): value is DocumentFontFamilyId {
  return DOCUMENT_FONT_ID_SET.has(value as DocumentFontFamilyId);
}

export function normalizeDocumentFontFamilyId(value: string | null | undefined): DocumentFontFamilyId {
  const normalized = (value ?? "").trim().toLowerCase();

  if (isDocumentFontFamilyId(normalized)) {
    return normalized;
  }

  if (normalized in DOCUMENT_FONT_ALIAS_MAP) {
    return DOCUMENT_FONT_ALIAS_MAP[normalized];
  }

  return DEFAULT_DOCUMENT_FONT_FAMILY;
}

export const documentFontOptions: Array<{
  value: DocumentFontFamilyId;
  label: string;
}> = documentFontDefinitions.map((font) => ({
  value: font.id,
  label: font.label,
}));

function toFontFamilyValue(font: DocumentFontRegistryEntry) {
  return `'${font.primaryFamily}', ${font.fallbackStack}`;
}

export const DOCUMENT_FONT_FAMILY_MAP: Record<DocumentFontFamilyId, string> = Object.fromEntries(
  documentFontDefinitions.map((font) => [font.id, toFontFamilyValue(font)]),
) as Record<DocumentFontFamilyId, string>;

export function getDocumentFontStylesheetHref(fontFamily: string | null | undefined) {
  const normalized = normalizeDocumentFontFamilyId(fontFamily);
  return DOCUMENT_FONT_REGISTRY[normalized].stylesheetHref;
}

export const DOCUMENT_EDITOR_FONT_STYLESHEET_HREFS = documentFontDefinitions
  .filter((font) => font.scope === "editor")
  .map((font) => font.stylesheetHref);

// Legacy Re-exports for backwards compatibility during migration
export const RESUME_FONT_REGISTRY = DOCUMENT_FONT_REGISTRY;
export const DEFAULT_RESUME_FONT_FAMILY = DEFAULT_DOCUMENT_FONT_FAMILY;
export const RESUME_FONT_FAMILY_MAP = DOCUMENT_FONT_FAMILY_MAP;
export const resumeFontOptions = documentFontOptions;
export const normalizeResumeFontFamilyId = normalizeDocumentFontFamilyId;
export const getResumeFontStylesheetHref = getDocumentFontStylesheetHref;
export const RESUME_EDITOR_FONT_STYLESHEET_HREFS = DOCUMENT_EDITOR_FONT_STYLESHEET_HREFS;
