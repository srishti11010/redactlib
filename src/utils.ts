import { defaultDetectors } from "./detectors.js";
import { Detector, RedactOptions } from "./types.js";

export function getActiveDetectors(options?: RedactOptions): Detector[] {
  const detectors = options?.detectors ?? defaultDetectors;
  const enabled = options?.enabledDetectors;

  if (!enabled || enabled.length === 0) {
    return detectors;
  }

  const enabledSet = new Set(enabled);
  return detectors.filter((d) => enabledSet.has(d.name));
}

export function applyDetectors(input: string, options?: RedactOptions): string {
  let output = input;
  const detectors = getActiveDetectors(options);

  for (const detector of detectors) {
    const replacement =
      detector.replaceWith ??
      options?.replacement ??
      `[REDACTED_${String(detector.name).toUpperCase()}]`;

    output = output.replace(detector.pattern, (match) => {
      if (typeof replacement === "function") {
        return replacement(match);
      }
      return replacement;
    });
  }

  return output;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function shouldRedactKey(key: string, sensitiveKeys: string[]): boolean {
  const normalized = key.toLowerCase();
  return sensitiveKeys.some((k) => normalized.includes(k.toLowerCase()));
}