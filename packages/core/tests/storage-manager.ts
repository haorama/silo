import { LocalAdapter, StorageManager } from "../src";
import { resolve } from "path";

export const storageManager = new StorageManager({
  defaultDisk: "local",
  disks: {
    local: {
      driver: "local",
      adapter: LocalAdapter,
      config: {
        root: resolve("./test-storage/local"),
      },
    },
    public: {
      driver: "local",
      adapter: LocalAdapter,
      shouldThrow: true,
      config: {
        root: resolve("./test-storage/public"),
      },
    },
  },
});
