import { z } from "zod";

import { isValidUsername, normalizeUsername, usernameInvalidReason } from "#utils/slugs";

export const usernameSchema = z
  .string()
  .trim()
  .transform((value) => normalizeUsername(value))
  .refine(
    (value) => isValidUsername(value),
    (value) => ({
      message: usernameInvalidReason(value) || "invalid_username",
    }),
  );

export const updateUserNameSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").max(255, "Name is too long"),
});

export const updateUsernameSchema = z.object({
  username: usernameSchema,
});

export const usernameAvailabilityParamsSchema = z.object({
  username: z
    .string()
    .trim()
    .transform((value) => normalizeUsername(value)),
});
