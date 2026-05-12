"use client";

import { getDocumentFontStylesheetHref } from "./font-registry";

const loadedDocumentFontStylesheets = new Set<string>();

export function ensureDocumentFontStylesheet(fontFamily: string | null | undefined) {
  if (typeof document === "undefined") {
    return;
  }

  const href = getDocumentFontStylesheetHref(fontFamily);

  if (!href || loadedDocumentFontStylesheets.has(href)) {
    return;
  }

  const existingLink = document.querySelector(`link[rel="stylesheet"][href="${href}"]`);

  if (existingLink) {
    loadedDocumentFontStylesheets.add(href);
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.append(link);

  loadedDocumentFontStylesheets.add(href);
}

// Legacy Re-export
export const ensureResumeFontStylesheet = ensureDocumentFontStylesheet;
