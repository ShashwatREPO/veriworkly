import { z } from "zod";
import { DocumentType, Visibility } from "@prisma/client";

import { normalizeSlug, normalizeTags } from "#utils/slugs";

export const documentTypeSchema = z.nativeEnum(DocumentType);
export const visibilitySchema = z.nativeEnum(Visibility);

export const documentTitleSchema = z.string().trim().min(1).max(255);

export const documentSlugSchema = z
  .string()
  .trim()
  .min(1)
  .max(255)
  .transform((value) => normalizeSlug(value));

export const documentTagsSchema = z
  .array(z.string().trim().min(1).max(40))
  .max(20)
  .transform((tags) => normalizeTags(tags));

export const documentCreateSchema = z.object({
  id: z.string().optional(),
  type: documentTypeSchema,
  title: documentTitleSchema.optional(),
  slug: documentSlugSchema.optional(),
  tags: documentTagsSchema.optional(),
  content: z.record(z.any()).optional(),
  metadata: z.record(z.any()).optional(),
  templateId: z.string().min(1).max(64).optional(),
  visibility: visibilitySchema.optional(),
});

export const documentUpdateSchema = z.object({
  title: documentTitleSchema.optional(),
  slug: documentSlugSchema.optional(),
  updateShareSlug: z.boolean().optional(),
  tags: documentTagsSchema.optional(),
  content: z.record(z.any()).optional(),
  metadata: z.record(z.any()).optional(),
  templateId: z.string().min(1).max(64).optional(),
  visibility: visibilitySchema.optional(),
  revision: z.number().int().min(1),
});

export type DocumentCreateRequest = z.infer<typeof documentCreateSchema>;
export type DocumentUpdateRequest = z.infer<typeof documentUpdateSchema>;
