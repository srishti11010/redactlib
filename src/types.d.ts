export type RedactionType = "email" | "phone" | "creditCard" | "ip" | "jwt" | "apiKey" | "privateKey" | "custom" | "sensitiveField";
export interface Detector {
    name: RedactionType | string;
    pattern: RegExp;
    replaceWith?: string | ((match: string) => string);
}
export interface RedactOptions {
    detectors?: Detector[];
    enabledDetectors?: string[];
    replacement?: string;
    sensitiveKeys?: string[];
    redactMatchingKeysOnly?: boolean;
    preserveStructure?: boolean;
}
