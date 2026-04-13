import { RedactOptions } from "./types.js";
import { applyDetectors } from "./utils.js";

export function redactString(input: string, options?: RedactOptions): string {
  if (typeof input !== "string") {
    throw new TypeError("redactString expected a string");
  }

  return applyDetectors(input, options);
}