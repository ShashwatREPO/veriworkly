"use client";

export function safeText(value: string | undefined | null): string {
  return value?.trim() ?? "";
}

export function formatDateRange(startDate: string, endDate: string, current: boolean): string {
  const start = safeText(startDate) || "Start";

  if (current) {
    return `${start} - Present`;
  }

  const end = safeText(endDate) || "End";
  return `${start} - ${end}`;
}

export function sanitizeFileName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
