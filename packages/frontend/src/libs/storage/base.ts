import { isNumber, isString } from "@worksolutions/utils";
import { encode, decode } from "js-base64";

export abstract class BaseStorage {
  constructor(
    name: string,
    private raw: boolean,
    version?: string,
  ) {
    if (version) this.name = name + "__" + version;
    else this.name = name;
  }

  readonly name: string;

  protected encode(value: string, liveTimeMS: number) {
    if (this.raw) return value;
    return encode(JSON.stringify({ value, liveTimeMS }));
  }

  protected decode(encodedValue: string) {
    if (this.raw) return { value: encodedValue };
    try {
      const { value, liveTimeMS } = JSON.parse(decode(encodedValue));
      if (!isNumber(liveTimeMS)) return null;
      if (!isString(value)) return null;
      return { value, liveTimeMS };
    } catch (e) {
      return null;
    }
  }

  abstract set(value: string | null): void;
  abstract remove(): void;
  abstract get(): string | null;

  protected getParsedValue(rawValue: string | null | undefined) {
    if (!rawValue) return null;
    const decodedValue = this.decode(rawValue);
    if (!decodedValue) return null;
    this.set(decodedValue.value);
    return decodedValue.value;
  }
}
