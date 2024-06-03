import { beforeAll, afterAll } from "vitest";
import { storageManager } from "./storage-manager";

beforeAll(async () => {
  await storageManager.disk().put("get.txt", "get txt");
});

afterAll(async () => {
  await storageManager.disk().remove(["test.txt", "movev2.txt", "get.txt"]);
});
