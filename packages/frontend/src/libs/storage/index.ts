import Cookie from "js-cookie";

import { BaseStorage } from "./base";

export class Cookies extends BaseStorage {
  constructor(
    name: string,
    raw: boolean,
    private liveTimeMS: number,
    version?: string,
  ) {
    super(name, raw, version);
  }

  set(value: string | null) {
    if (value) {
      const expires = new Date(Date.now() + this.liveTimeMS);
      Cookie.set(this.name, this.encode(value, this.liveTimeMS), { path: "/", expires });
    } else this.remove();
  }

  remove() {
    Cookie.remove(this.name, { path: "/" });
  }

  get() {
    const raw = Cookie.get(this.name);
    return this.getParsedValue(raw);
  }
}

export class LocalStorage extends BaseStorage {
  set(value: string | null) {
    if (value !== null) {
      localStorage.setItem(this.name, this.encode(value, -1));
    } else this.remove();
  }

  remove() {
    localStorage.removeItem(this.name);
  }

  get() {
    const raw = localStorage.getItem(this.name);
    return this.getParsedValue(raw);
  }
}
