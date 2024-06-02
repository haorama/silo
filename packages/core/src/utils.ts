import { promisify } from "util";
import { pipeline as nodePipeline } from "stream";

export function isReadableStream(stream: any): boolean {
  return (
    stream !== null &&
    typeof stream === "object" &&
    typeof stream.pipe === "function" &&
    typeof stream._read === "function" &&
    typeof stream._readableState === "object" &&
    stream.readable !== false
  );
}

export const pipeline = promisify(nodePipeline);
