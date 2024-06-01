import type { DriverOptions, FileContent, MoveFileOptions } from "./types";

export abstract class SiloAdapter {
  $options: DriverOptions;

  constructor(options: DriverOptions) {
    this.$options = options;
  }

  abstract put(path: string, content?: FileContent): Promise<any>;
  abstract remove(path: string | string[]): Promise<any>;
  abstract move(
    from: string,
    to: string,
    options?: MoveFileOptions,
  ): Promise<any>;
}
