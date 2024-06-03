import { describe, expect, it } from "vitest";
import { storageManager } from "./storage-manager";

const text = "Some text";
const GET_TXT_FILE = "get.txt";
const NOT_EXISTS_FILE = "not-exists-file.txt";

describe("LocalAdapter", () => {
  it("(get) should return buffer content", async () => {
    const result = await storageManager.disk().get(GET_TXT_FILE);
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it("(get) should return string if encoding is defined", async () => {
    const result = await storageManager.disk().get(GET_TXT_FILE, "utf-8");
    expect(result).toBeTypeOf("string");
  });

  it("(put, local) should put file in local directory", async () => {
    const result = await storageManager.disk().put("test.txt", text);
    expect(result).toBeDefined();
  });

  it("(put, public) should put file in public directory", async () => {
    const result = await storageManager.disk("public").put("put.txt", text);
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
        .remove(NOT_EXISTS_FILE, { shouldThrow: true });
    }).rejects.toThrowError(/ENOENT/);
  });

  it("(move) should move file", async () => {
    await storageManager.disk().put("move.txt", text);
    const result = await storageManager.disk().move("move.txt", "movev2.txt");
    expect(result).toBe(true);
  });

  it("use alias of disk", async () => {
    const result = await storageManager.get(GET_TXT_FILE);
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it("(public) should throw an error in public storage when config root shouldThrow is defined", async () => {
    expect(async () => {
      await storageManager.disk("public").get(NOT_EXISTS_FILE);
    }).rejects.toThrow(/ENOENT/);
  });

  it("should not throw an error if shouldThrow in method level is set to false", async () => {
    const result = await storageManager
      .disk("public")
      .get("not-exists-file.text", {
        shouldThrow: false,
      });

    expect(result).toBeUndefined();
  });

  it("(exists) should check file exists", async () => {
    const existsFile = await storageManager.disk().exists(GET_TXT_FILE);
    const notExistsFile = await storageManager.disk().exists(NOT_EXISTS_FILE);
    expect(existsFile).toBe(true);
    expect(notExistsFile).toBe(false);
  });
});
