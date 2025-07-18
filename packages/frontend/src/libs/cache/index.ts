import { waitFor } from "@worksolutions/utils";

export class CacheStorage {
  constructor(private name: string) {
    void this.initDirectory();
  }

  private directory!: Promise<FileSystemDirectoryHandle> | null;

  private initDirectory() {
    if (!navigator.storage) return void (this.directory = null);
    this.directory = navigator.storage
      .getDirectory()
      .then((root) => root.getDirectoryHandle(this.name, { create: true }));
  }

  async get(fileName: string) {
    if (!this.directory) return null;
    try {
      const fileHandle = await (await this.directory).getFileHandle(fileName);
      const file = await fileHandle.getFile();
      if (file.size === 0) return null;
      return await file.arrayBuffer();
    } catch (e) {
      return null;
    }
  }

  async getOrWait(fileName: string) {
    let file: ArrayBuffer | null = null;
    await waitFor(async () => {
      file = await this.get(fileName);
      return !!file;
    });

    return file!;
  }

  async set(fileName: string, content: Blob | ArrayBuffer) {
    if (!this.directory) return null;
    try {
      const fileHandle = await (await this.directory).getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      return true;
    } catch (e) {
      return false;
    }
  }

  async remove(fileName: string) {
    if (!this.directory) return null;
    try {
      await (await this.directory).removeEntry(fileName);
      return true;
    } catch (e) {
      return false;
    }
  }

  async clear() {
    if (!this.directory) return null;
    try {
      const directory = (await this.directory) as FileSystemDirectoryHandle & {
        keys: () => AsyncIterator<string> & AsyncIterable<string>;
      };
      for await (const fileName of directory.keys()) {
        await this.remove(fileName);
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
