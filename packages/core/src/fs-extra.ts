import type { Mode } from "fs";
import { promises as fs } from "fs";

export async function ensureDir(dir: string, mode?: Mode) {
  await fs.mkdir(dir, { recursive: true, mode });
}

export async function removeFile(path: string) {
  await fs.unlink(path);
}

export async function moveFile(from: string, to: string) {
  await fs.rename(from, to);
}

export async function outputFile(path: string, content: any) {
  await fs.writeFile(path, content);
}

export function readFile(
  path: string,
  encoding?: null | undefined,
): Promise<Buffer>;
export function readFile(
  path: string,
  encoding?: BufferEncoding,
): Promise<string>;

export async function readFile(
  path: string,
  encoding?: BufferEncoding | (null | undefined),
) {
  if (!encoding) {
    return await fs.readFile(path);
  }

  return await fs.readFile(path, encoding);
}
