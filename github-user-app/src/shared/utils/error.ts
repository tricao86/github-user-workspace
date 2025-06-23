import i18n from "@locales/i18n";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return i18n.t("errors.unknown");
}
