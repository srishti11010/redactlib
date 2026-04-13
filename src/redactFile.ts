import { promises as fs } from "node:fs";
import { RedactOptions } from "./types.js";
import { applyDetectors } from "./utils.js";

export interface RedactFileOptions extends RedactOptions {
  encoding?: BufferEncoding;
  outputPath?: string;
}

export async function redactFile(
  input: string | Buffer,
  options?: RedactFileOptions
): Promise<string> {
  const encoding = options?.encoding ?? "utf8";

  let content: string;

  if (Buffer.isBuffer(input)) {
    content = input.toString(encoding);
  } else if (typeof input === "string") {
    content = await fs.readFile(input, encoding);
  } else {
    throw new TypeError("redactFile expected a file path or Buffer");
  }

  const redacted = applyDetectors(content, options);

  if (options?.outputPath) {
    await fs.writeFile(options.outputPath, redacted, encoding);
  }

  return redacted;
}