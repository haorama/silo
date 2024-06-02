import { NotImplementedError } from "./errors";
import type {
  DiskOptions,
  FileContent,
  GetOptions,
  MoveOptions,
  PutOptions,
  RemoveOptions,
} from "./types";

export abstract class SiloAdapter {
  $options: DiskOptions;

  constructor(options: DiskOptions) {
    this.$options = options;
  }

  protected getThrowStat(methodValue?: boolean) {
    if (typeof methodValue !== "undefined") {
      return methodValue;
    }

    return this.$options.shouldThrow ?? false;
  }

  get(path: string, options?: GetOptions): Promise<Buffer>;
  get(
    path: string,
    optionsOrEncoding?: GetOptions | BufferEncoding,
    options?: GetOptions,
  ): Promise<string>;
  get(path: string, options?: GetOptions): Promise<Buffer | string> {
    throw new NotImplementedError("get not implemented");
  }

  put(path: string, content?: FileContent, options?: PutOptions): Promise<any> {
    throw new NotImplementedError("put not implemented");
  }

  remove(path: string | string[], options?: RemoveOptions): Promise<boolean> {
    throw new NotImplementedError("remove not implemented");
  }

  move(from: string, to: string, options?: MoveOptions): Promise<any> {
    throw new NotImplementedError("move not implemented");
  }
}
