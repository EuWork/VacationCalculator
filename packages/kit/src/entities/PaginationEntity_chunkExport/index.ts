import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export interface PaginationQueryInterface {
  page: number;
  perPage: number;
}

export class PaginationEntity implements PaginationQueryInterface {
  static build(options: PaginationQueryInterface & { totalCount: number }) {
    const entity = new PaginationEntity();
    entity.totalCount = options.totalCount;
    entity.page = options.page;
    entity.perPage = options.perPage;
    return entity;
  }

  @Expose() @IsNumber() totalCount!: number;
  @Expose() @IsNumber() page!: number;
  @Expose() @IsNumber() perPage!: number;

  get totalPages() {
    return Math.ceil(this.totalCount / this.perPage);
  }

  get canGetMore() {
    return this.page * this.perPage < this.totalCount;
  }

  get plain() {
    return { totalCount: this.totalCount, page: this.page, perPage: this.perPage };
  }
}

export interface PaginatedFindResult<Entity> {
  items: Entity[];
  pagination: PaginationEntity;
}

export function createEmptyPaginatedFindResult<Entity>(): PaginatedFindResult<Entity> {
  return { items: [], pagination: PaginationEntity.build({ page: 1, perPage: 1, totalCount: 0 }) };
}

export function applyPaginatedFindResults<ApiLoadedEntity, CurrentEntity>(
  current: PaginatedFindResult<CurrentEntity>,
  apiLoadedResults: PaginatedFindResult<ApiLoadedEntity>,
  mapper: CurrentEntity extends ApiLoadedEntity ? undefined : (entity: ApiLoadedEntity) => CurrentEntity,
) {
  current.pagination = apiLoadedResults.pagination;
  const resultItemsToAdd = mapper ? apiLoadedResults.items.map(mapper) : apiLoadedResults.items;
  if (apiLoadedResults.pagination.page === 1) {
    current.items = resultItemsToAdd as CurrentEntity[];
  } else {
    current.items.push(...(resultItemsToAdd as CurrentEntity[]));
  }
}
