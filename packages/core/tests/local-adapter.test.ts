import { describe, expect, it } from "vitest";
import { storageManager } from "./storage-manager";

const text = "Some text";

describe("LocalAdapter", () => {
  it("(get) should return buffer content", async () => {
    const result = await storageManager.disk().get("get.txt");
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it("(get) should return string if encoding is defined", async () => {
    const result = await storageManager.disk().get("get.txt", "utf-8");
    expect(result).toBeTypeOf("string");
  });

  it("(put) should put file in directory", async () => {
    const result = await storageManager.disk().put("test.txt", text);
    expect(result).toBeDefined();
  });

  it("(remove) should remove file", async () => {
    await storageManager.disk().put("for-delete.txt", text);
    const result = await storageManager.disk().remove("for-delete.txt");
    expect(result).toBe(true);
  });

  it("(remove) should throw if remove file is not exists", () => {
    expect(async () => {
      await storageManager
        .disk()
        .remove("not-exists-file.txt", { shouldThrow: true });
    }).rejects.toThrowError(/ENOENT/);
  });

  it("(move) should move file", async () => {
    await storageManager.disk().put("move.txt", text);
    const result = await storageManager.disk().move("move.txt", "movev2.txt");
    expect(result).toBe(true);
  });
});
