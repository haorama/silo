import type { Mode } from "fs";
import type { PutOptions as PutOptionsCore } from "@silo/core";

export interface PutOptions extends PutOptionsCore {
  /** directory mode if no dir exists, default as same as 0o777 */
  dirMode?: Mode;
}
