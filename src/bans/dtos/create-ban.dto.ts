import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, Length } from "class-validator";

export class CreateBanDto {
  @ApiProperty({ minimum: 1 })
  @IsInt()
  @IsPositive()
  userNo: number;

  @ApiProperty({ minimum: 1, maximum: 100 })
  @Length(1, 100)
  content: string;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  expireDays?: number;
}
