import { ApiProperty } from "@nestjs/swagger";
import { ReportCategory } from "@prisma/client";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

export class CreateOneReportDto {
  @ApiProperty({ format: "Integer", description: "신고할 유저 번호" })
  @IsInt()
  @IsPositive()
  receiverNo: number;

  @ApiProperty({ minimum: 1, maximum: 250, description: "신고 내용" })
  @IsString()
  @Length(1, 250)
  content: string;

  @ApiProperty({
    enum: ReportCategory,
    default: ReportCategory.other,
    description: "신고 카테고리",
  })
  @IsOptional()
  @IsEnum(ReportCategory)
  category?: ReportCategory;
}
