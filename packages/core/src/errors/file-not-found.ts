export class FileNotFound {
  error: any;
  path?: string;

  constructor(error: any, path?: string) {
    this.error = error;
    this.path = path;
  }
}
