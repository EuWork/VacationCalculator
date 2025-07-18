import { createCustomValidationError } from "@app/kit";

export const NOT_EMPTY_VALIDATION = createCustomValidationError("should_not_be_empty");
export const SHOULD_BE_EMAIL_LIKE_VALIDATION = createCustomValidationError("should_be_email_like");
