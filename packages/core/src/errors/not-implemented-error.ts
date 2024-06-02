export class NotImplementedError extends Error {
  raw: any;
  path?: string;

  constructor(error: any) {
    super(error?.message ?? "Not Implemented");
    this.raw = error;
  }
}
