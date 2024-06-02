import type { Mode } from "fs";
import type { SiloAdapter } from "./adapter";

export interface TypeAdapter<T extends SiloAdapter = SiloAdapter> {
  new (...args: any[]): T;
}

export type LocalDiskOptions = {
  driver: "local";
  adapter: TypeAdapter;
  shouldThrow?: boolean;
  config: {
    root: string;
    [key: string]: any;
  };
};

export type CommonDiskOptions = {
  driver: string;
  adapter: TypeAdapter;
  shouldThrow?: boolean;
  config: {
    [key: string]: any;
  };
};

export interface CommonOperationOptions {
  /** whether the put operation should throw an error, default false */
  shouldThrow?: boolean;
}

export type DiskOptions = LocalDiskOptions | CommonDiskOptions;

export interface StorageManagerContructorOptions {
  defaultDisk: string;
  disks: Record<string, DiskOptions>;
}

export type FileContent = Buffer | ReadableStream | string;

export interface PutOptions extends CommonOperationOptions {
  /** only available on local driver */
  dirMode?: Mode;
}

export interface GetOptions extends CommonOperationOptions {}

export interface RemoveOptions extends CommonOperationOptions {}

export interface MoveOptions extends CommonOperationOptions {}
