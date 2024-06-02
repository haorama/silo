# Silo
Multi filesystem / storage for nodejs

## Installation

```bash
npm install @haorama/silo

yarn add @haorama/silo

pnpm add @haorama/silo
```

## Configuration

Start by creating `StorageManager` instance in your application

```ts
import { LocalAdapter, StorageManager } from "@haorama/silo";
import { resolve } from "path";

export const storageManager = new StorageManager({
  defaultDisk: "local",
  disks: {
    local: {
      driver: "local",
      adapter: LocalAdapter,
      config: {
        root: resolve("./storage"),
      },
    },
    public: {
      driver: "local",
      adapter: LocalAdapter,
      config: {
        root: resolve("./public/storage"),
      },
    },
  },
});
```

## Usage
use your `StorageManager` instance to interact with any of your configured disks. for example you can use `put` method to put txt file into your `default disk`.

```ts
storageManager.put("somefile.txt", "this is a text file")
```

Or if your storageManager instance contains multiple disk you may use `disk` method first

```ts
storageManager.disk("public").put("somefile.txt", "this is a text file")
```

### Retrieving Files
use `get` method to retrieve the contents of a file. by default Buffer will return from by the method.

```ts
await storageManager.get("somefile.txt");
```

the `get` method contains 2 additional arguments (3 in totals) that you can passed. The second argument can be string which is `BufferEncoding` or an object, if the second arguments is BufferEncoding the third arguments is available. For example:

```ts
await storageManager.get("somefile.txt", "utf-8");

await storageManager.get("somefile.txt", { shouldThrow: true });

await storageManager.get("somefile.txt", "utf-8", { shouldThrow: true });
```
### Paramaters

| name | type | Description |
| --- | --- | --- |
| path | List all new or modified files | path to file |
| optionsOrBufferEncoding | `string` or `BufferEncoding` | encoding or options |
| options | `GetOptions` | options, not available if second argument is options |

Noted that when passing `BufferEncoding` the `get` method will return `string` instead `Buffer`

### Storing File
The `put` method can be used to store file contents on a disk. the first argument is the path or/and file including the file format, the second one is the contents accept `string`, `Buffer` or `ReadableStream`

```ts
await storageManager.put("somefile.txt", "some text");

await storageManager.put("images/avatar.jpeg", contents);
```

### Moving Files
use `move` method to move your files into other location within your disk directory

```ts
await storageManager.move("somefile.txt", "somefilev2.txt");
```
Noted that move can also act like renaming files.

### Deleting Files
used `remove` method to delete file(s), you can passed `string` or array of string for multipe path in the first argument
```ts
// remove accept multiple path
await storageManager.remove("somefile.txt");

await storageManager.remove(["somefile.txt", "images/avatar.jpeg"]);
```

### Failed Operations
By default every failed operations does not throw an error and instead returning `false` or `undefined` value if operation failed.
Most of the operations method like `get`, `put`, `remove` etc contains optional `{ shouldThrow: boolean }` options (and maybe other fields) that you can
passed to throw an `Error`.

```ts
await storageManager.get("somefile.txt", { shouldThrow: true });
```

In the example above if `somefile.txt` file does not exists it will throw `FileError`.
If you wish, you may define the `shouldThrow` option within your disks config in the `StorageManager` instance

```ts
export const storageManager = new StorageManager({
  defaultDisk: "local",
  disks: {
    local: {
      driver: "local",
      adapter: LocalAdapter,
      shouldThrow: true,
      config: {
        root: resolve("./storage"),
      },
    },
    // rest of your code
  },
});
```

Noted that the method options is prioritized, so for example if you set `shouldThrow` to false in your `put` method if wont throw an error. The configuration are depend on your app needed either if most of your operation should throw an error or not.
