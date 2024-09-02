import { ApiPropertyOptional } from "@nestjs/swagger";
import { ReportCategory } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export class ReportsPaginationDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ReportCategory })
  @IsEnum(ReportCategory)
  @IsOptional()
  category?: ReportCategory;
}
