import { Type } from "class-transformer";
import { IsInt, IsObject, IsOptional } from "class-validator";

export class getNeighborDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page: number;
}
