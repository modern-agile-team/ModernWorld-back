import { Type } from "class-transformer";

export class getNeighborDto {
  @Type(() => Number)
  take: number;

  @Type(() => Number)
  page: number;
}
