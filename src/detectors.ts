import { Detector } from "./types.js";

export const defaultDetectors: Detector[] = [
  {
    name: "email",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    replaceWith: "[REDACTED_EMAIL]",
  },
  {
    name: "phone",
    pattern: /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g,
    replaceWith: "[REDACTED_PHONE]",
  },
  {
    name: "creditCard",
    pattern: /\b(?:\d[ -]*?){13,19}\b/g,
    replaceWith: "[REDACTED_CARD]",
  },
  {
    name: "ip",
    pattern: /\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b/g,
    replaceWith: "[REDACTED_IP]",
  },
  {
    name: "jwt",
    pattern: /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9._-]+\.[A-Za-z0-9._-]+\b/g,
    replaceWith: "[REDACTED_JWT]",
  },
  {
    name: "apiKey",
    pattern: /\b(?:sk|pk|rk|AKIA|AIza|ghp|github_pat)_[A-Za-z0-9_\-]{8,}\b/g,
    replaceWith: "[REDACTED_API_KEY]",
  },
  {
    name: "privateKey",
    pattern: /-----BEGIN[\s\S]*?PRIVATE KEY-----[\s\S]*?-----END[\s\S]*?PRIVATE KEY-----/g,
    replaceWith: "[REDACTED_PRIVATE_KEY]",
  },
];