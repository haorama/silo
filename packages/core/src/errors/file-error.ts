export class FileError extends Error {
  raw: any;
  path?: string;

  constructor(error: any) {
    super(error?.message ?? "File Error");
    this.raw = error;
  }
}
