import { IsDefined, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";

import { BaseEntity } from "entities/BaseEntity_chunkExport";
import { Constructable } from "types";

export function arrayOfEntities<ENTITY extends BaseEntity>(
  Entity: Constructable<ENTITY>,
): Constructable<BaseEntity & { array: ENTITY[] }> {
  class ArrayOfEntities extends BaseEntity {
    static __requestSchemaTransform = (array: ENTITY[]) => ({ array });
    @Expose() @IsDefined() @ValidateNested({ each: true }) @Type(() => Entity) array!: ENTITY[];
  }

  return ArrayOfEntities;
}
