import fs from "fs";
import { dirname } from "path";
import { isReadableStream, pipeline } from "./utils";
import type {
  FileContent,
  GetOptions,
  MoveOptions,
  PutOptions,
  RemoveOptions,
} from "./types";
import {
  ensureDir,
  moveFile,
  outputFile,
  pathExists,
  readFile,
  removeFile,
} from "./fs-extra";
import { SiloAdapter } from "./adapter";
import { FileError } from "./errors";

export class LocalAdapter extends SiloAdapter {
  fullPath(path: string) {
    return this.$options.config.root + "/" + path;
  }

  get(path: string, options?: GetOptions): Promise<Buffer>;
  get(
    path: string,
    optionsOrEncoding?: GetOptions | BufferEncoding,
    options?: GetOptions,
  ): Promise<string>;

  async get(
    path: string,
    optionsOrEncoding?: GetOptions | BufferEncoding,
    options?: GetOptions,
  ) {
    const fullPath = this.fullPath(path);

    try {
      if (typeof optionsOrEncoding === "string") {
        const result = await readFile(fullPath, optionsOrEncoding);
        return result;
      }

      const result = await readFile(fullPath);

      return result;
    } catch (error) {
      const methodShouldThrow =
        typeof optionsOrEncoding === "string"
          ? options?.shouldThrow
          : optionsOrEncoding?.shouldThrow;

      if (this.getThrowStat(methodShouldThrow)) {
        throw new FileError(error);
      }
    }
  }

  /**
   * Creates a new file.
   * This method will create missing directories on the fly.
   */
  async put(
    path: string,
    content: FileContent,
    options?: PutOptions,
  ): Promise<any> {
    const fullPath = this.fullPath(path);

    try {
      const dir = dirname(fullPath);
      await ensureDir(dir, options?.dirMode);

      if (isReadableStream(content)) {
        const ws = fs.createWriteStream(fullPath);
        await pipeline(content as any, ws);
        return { raw: undefined };
      }

      const result = await outputFile(fullPath, content);
      return { raw: result };
    } catch (error) {
      if (this.getThrowStat(options?.shouldThrow)) {
        throw new FileError(error);
      }

      return { raw: undefined };
    }
  }

  async remove(path: string | string[], options?: RemoveOptions): Promise<any> {
    const paths = !path ? [] : typeof path === "string" ? [path] : path;

    try {
      await Promise.all(
        paths.map(async (v) => {
          await removeFile(this.fullPath(v));
        }),
      );

      return true;
    } catch (error) {
      if (this.getThrowStat(options?.shouldThrow)) {
        throw new FileError(error);
      }

      return false;
    }
  }

  async move(from: string, to: string, options?: MoveOptions) {
    const sourcePath = this.fullPath(from);
    const distPath = this.fullPath(to);

    try {
      const newDir = dirname(distPath);
      await ensureDir(newDir);

      await moveFile(sourcePath, distPath);
      return true;
    } catch (error) {
      if (this.getThrowStat(options?.shouldThrow)) {
        throw new FileError(error);
      }

      return false;
    }
  }

  exists(path: string) {
    return pathExists(this.fullPath(path));
  }
}
