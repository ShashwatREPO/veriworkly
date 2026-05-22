import type { TemplateMeta } from "./types";
import type { DocumentType } from "./document-types";

export const templateCatalogByType: Record<DocumentType, TemplateMeta[]> = {
  RESUME: [
    {
      id: "executive-clarity",
      name: "Executive Clarity",
      documentType: "RESUME",
      description: "Clean, ATS-friendly executive resume layout.",
      accentColor: "#000000",
      previewImage: "",
      tags: ["ATS", "Modern"],
    }
  ],

  COVER_LETTER: [
    {
      id: "cover-letter-classic",
      name: "Classic Cover Letter",
      documentType: "COVER_LETTER",
      description: "Traditional cover letter layout.",
      accentColor: "#0ea5e9",
      previewImage: "",
      tags: ["Classic"],
    }
  ],

  FORMAL_LETTER: [
    {
      id: "formal-letter-modern",
      name: "Modern Formal Letter",
      documentType: "FORMAL_LETTER",
      description: "Structured formal correspondence format.",
      accentColor: "#0ea5e9",
      previewImage: "",
      tags: ["Formal", "Letter"],
    },
  ],

  INVOICE: [
    {
      id: "invoice-clean",
      name: "Clean Invoice",
      documentType: "INVOICE",
      description: "Deterministic line-item invoice layout.",
      accentColor: "#10b981",
      previewImage: "",
      tags: ["Invoice", "Clean"],
    },
  ],
};

export const allTemplates = Object.values(templateCatalogByType).flat();
