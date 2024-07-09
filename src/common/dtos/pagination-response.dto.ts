export class PaginationResponseDto<T> {
  data: Array<T>;

  meta: {
    page: number;

    take: number;

    totalCount: number;

    totalPage: number;
  };

  constructor(
    data: Array<T>,
    meta: { page: number; take: number; totalCount: number; totalPage: number },
  ) {
    this.data = data;
    this.meta = meta;
  }
}
