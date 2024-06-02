# Silo Core
This package include Silo Core package and Local Adapter Disk / Driver

## Installation

```bash
npm install @haorama/silo

yarn add @haorama/silo

pnpm add @haorama/silo
```

## Usage

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
