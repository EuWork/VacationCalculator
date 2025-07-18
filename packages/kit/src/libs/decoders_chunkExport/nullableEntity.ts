import { IsOptional, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { isNil } from "@worksolutions/utils";

import { BaseEntity } from "entities/BaseEntity_chunkExport";

import { Constructable } from "types";

export function nullableEntity<ENTITY extends BaseEntity>(
  Entity: Constructable<ENTITY>,
): Constructable<BaseEntity & { nullableValue: ENTITY | null }> {
  class NullableEntity extends BaseEntity {
    static __requestSchemaTransform = (entity: any) => ({
      nullableValue: isNil(entity) || entity === "" ? null : entity,
    });
    @Expose() @ValidateNested() @Type(() => Entity) @IsOptional() nullableValue: ENTITY | null = null;
  }

  return NullableEntity;
}
