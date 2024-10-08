import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsPositive } from "class-validator";
import { OrderBy } from "../enum/order-by.enum";

export class PaginationDto {
  @ApiPropertyOptional({ default: 1, description: "페이지 번호" })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional({ default: 10, description: "가져올 자료 수" })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  take: number = 10;

  @ApiPropertyOptional({
    enum: OrderBy,
    default: OrderBy.DESC,
    description: "asc / desc",
  })
  @IsEnum(OrderBy)
  orderBy: OrderBy = OrderBy.DESC;
}
