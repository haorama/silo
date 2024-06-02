import { afterEach } from "vitest";
import { storageManager } from "./storage-manager";

afterEach(async () => {
  await storageManager.disk().remove("test.txt");
});
