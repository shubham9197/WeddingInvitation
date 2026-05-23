import type { Locale, WeddingContent } from "./types";
import { en } from "./en";
import { mr } from "./mr";

export type { Locale, WeddingContent } from "./types";

const catalogs: Record<Locale, WeddingContent> = { mr, en };

export const DEFAULT_LOCALE: Locale = "mr";

export function getWeddingContent(locale: Locale): WeddingContent {
  return catalogs[locale];
}
