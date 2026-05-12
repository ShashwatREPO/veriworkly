export const DOCUMENT_FONT_IDS = ["geist", "serif", "modern"] as const;

export type DocumentFontFamilyId = (typeof DOCUMENT_FONT_IDS)[number];
