import fs from "fs";
import { dirname } from "path";
import { isReadableStream, pipeline } from "./utils";
import type { FileContent, PutOptions } from "./types";
import { ensureDir, moveFile, outputFile, removeFile } from "./fs-extra";
import { SiloAdapter } from "./adapter";
import { FileError, PutError } from "./errors";

export class LocalAdapter extends SiloAdapter {
  getFullPath(path: string) {
    return this.$options.config.root + "/" + path;
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
    const fullPath = this.getFullPath(path);

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
      if (options?.shouldThrow) {
        throw new PutError(error);
      }
    }
  }

  async remove(path: string | string[], options?: any): Promise<any> {
    const paths = !path ? [] : typeof path === "string" ? [path] : path;

    try {
      await Promise.all(
        paths.map(async (v) => {
          await removeFile(this.getFullPath(v));
        }),
      );
      return { wasDeleted: true };
    } catch (error) {
      if (options?.shouldThrow === true) {
        throw new FileError(error);
      }
    }
  }

  async move(from: string, to: string): Promise<any> {
    const sourcePath = this.getFullPath(from);
    const distPath = this.getFullPath(to);

    try {
      const newDir = dirname(distPath);
      await ensureDir(newDir);

      await moveFile(sourcePath, distPath);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
