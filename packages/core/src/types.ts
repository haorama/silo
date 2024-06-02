import type { Mode } from "fs";
import type { SiloAdapter } from "./adapter";

export interface TypeAdapter<T extends SiloAdapter = SiloAdapter> {
  new (...args: any[]): T;
}

export type LocalDiskOptions = {
  driver: "local";
  adapter: TypeAdapter;
  config: {
    root: string;
    [key: string]: any;
  };
};

export type CommonDiskOptions = {
  driver: string;
  adapter: TypeAdapter;
  config: {
    [key: string]: any;
  };
};

export type DiskOptions = LocalDiskOptions | CommonDiskOptions;

export interface StorageManagerContructorOptions {
  defaultDisk: string;
  disks: Record<string, DiskOptions>;
}

export interface MoveFileOptions {
  overwrite?: boolean;
}

export type FileContent = Buffer | ReadableStream | string;

export interface PutOptions {
  /** whether the put operation should throw an error, default false */
  shouldThrow?: boolean;
  /** only available on local driver */
  dirMode?: Mode;
}
