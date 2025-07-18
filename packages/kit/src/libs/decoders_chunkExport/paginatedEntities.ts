import { ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";

import { BaseEntity } from "entities/BaseEntity_chunkExport";

import { Constructable } from "types";

import { PaginatedFindResult, PaginationEntity } from "entities";

export function paginatedEntities<ENTITY extends BaseEntity>(
  Entity: Constructable<ENTITY>,
): Constructable<BaseEntity & PaginatedFindResult<ENTITY>> {
  class PaginatedEntity extends BaseEntity {
    @Expose() @ValidateNested({ each: true }) @Type(() => Entity) items!: ENTITY[];
    @Expose() @ValidateNested() @Type(() => PaginationEntity) pagination!: PaginationEntity;
  }

  return PaginatedEntity;
}
