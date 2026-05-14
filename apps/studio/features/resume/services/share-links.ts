"use client";

import type { ResumeData } from "@/types/resume";
import {
  createShareLink,
  listShareLinks,
  revokeShareLink,
  type CreateShareLinkOptions,
  type CreateShareLinkResult,
  type ShareLinkItem,
} from "@/features/documents/services/share-service";

export type { ShareLinkItem };

export async function createResumeShareLink(
  resume: ResumeData,
  options: CreateShareLinkOptions = {},
): Promise<CreateShareLinkResult> {
  return createShareLink(resume.id, resume, options);
}

export async function listResumeShareLinks(resumeId: string): Promise<ShareLinkItem[]> {
  return listShareLinks(resumeId);
}

export async function revokeResumeShareLink(resumeId: string, shareLinkId: string) {
  return revokeShareLink(resumeId, shareLinkId);
}
