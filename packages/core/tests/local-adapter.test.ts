import { describe, expect, it } from "vitest";
import { storageManager } from "./storage-manager";

const text = "text for txt.file";

describe("Put File", () => {
  it("should put file in directory", async () => {
    const result = await storageManager.disk().put("test.txt", text);
    expect(result).toBeDefined();
  });

  it("should remove file", async () => {
    await storageManager.disk().put("for-delete.txt", text);
    const result = await storageManager.disk().remove("for-delete.txt");
    expect(result.wasDeleted).toBe(true);
  });
});
