import { LocalAdapter, StorageManager } from "../src";
import { resolve } from "path";

export const storageManager = new StorageManager({
  defaultDisk: "local",
  disks: {
    local: {
      driver: "local",
      adapter: LocalAdapter,
      config: {
        root: resolve("./test-storage"),
      },
    },
  },
});
