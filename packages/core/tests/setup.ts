import { beforeAll, afterAll } from "vitest";
import { storageManager } from "./storage-manager";

beforeAll(async () => {
  await storageManager.disk().put("get.txt", "get txt");
  await storageManager
    .disk("public")
    .put("public-file.txt", "public text file");
});

afterAll(async () => {
  await storageManager.disk().remove(["test.txt", "movev2.txt", "get.txt"]);
  await storageManager
    .disk("public")
    .remove(["public-file.txt", "put.txt"], { shouldThrow: false });
});
