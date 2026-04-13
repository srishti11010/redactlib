import { RedactOptions } from "./types.js";
import { applyDetectors, isPlainObject, shouldRedactKey } from "./utils.js";

const DEFAULT_SENSITIVE_KEYS = [
  "password",
  "passwd",
  "secret",
  "token",
  "apikey",
  "apiKey",
  "accessToken",
  "refreshToken",
  "authorization",
  "auth",
  "session",
  "cookie",
  "clientSecret",
  "privateKey",
];

export function redactObject<T>(input: T, options?: RedactOptions): T {
  const sensitiveKeys = options?.sensitiveKeys ?? DEFAULT_SENSITIVE_KEYS;

  function visit(value: unknown, parentKey?: string): unknown {
    if (typeof value === "string") {
      if (parentKey && shouldRedactKey(parentKey, sensitiveKeys)) {
        return "[REDACTED]";
      }
      return applyDetectors(value, options);
    }

    if (Array.isArray(value)) {
      return value.map((item) => visit(item));
    }

    if (isPlainObject(value)) {
      const result: Record<string, unknown> = {};

      for (const [key, val] of Object.entries(value)) {
        if (shouldRedactKey(key, sensitiveKeys)) {
          result[key] = "[REDACTED]";
        } else {
          result[key] = visit(val, key);
        }
      }

      return result;
    }

    return value;
  }

  return visit(input) as T;
}