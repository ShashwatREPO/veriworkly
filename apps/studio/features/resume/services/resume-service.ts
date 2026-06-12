"use client";

export {
  loadResume,
  saveResume,
  resetResume,
  createResume,
  deleteResume,
  loadResumeById,
  listSavedResumes,
  deleteResumeById,
  createResumeWithTemplate,
  setAllResumesSyncEnabled,
  importResumeFromFile,
  type ResumeListItem,
} from "./resume-core";

export * from "@/features/documents/export";

export {
  safeText,
  escapeHtml,
  getResumeTitle,
  formatDateRange,
  isSectionVisible,
  sanitizeFileName,
  getResumeFileBaseName,
} from "./resume-formatters";

export { importResumeFromMarkdownFile, parseResumeMarkdown } from "./resume-markdown-import";

export type { SaveResumeResult, SaveResumeOptions } from "./resume-core";
