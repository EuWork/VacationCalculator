import { plainToInstance, instanceToPlain } from "class-transformer";

import { Constructable } from "types";

export function plainToClass<T>(Class: Constructable<T>, plain: object): T {
  return plainToInstance(Class, plain, { enableImplicitConversion: false, exposeUnsetFields: false });
}

export function classToPlain(plain: object) {
  return instanceToPlain(plain, { strategy: "excludeAll", enableImplicitConversion: false });
}
