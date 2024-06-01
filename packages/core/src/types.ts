export interface DriverOptions {
  driver: string;
  // adapter?: Type<StorageAdapter>;
  config: {
    root?: string; //for local storage
    [key: string]: any;
  };
}

export interface MoveFileOptions {
  overwrite?: boolean;
}

export type FileContent = Buffer | ReadableStream | string;

export interface PutOptions {
  /** whether the put operation should throw an error, default false */
  shouldThrow?: boolean;
}
