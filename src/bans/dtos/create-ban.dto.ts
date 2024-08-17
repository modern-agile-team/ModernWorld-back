import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, Length } from "class-validator";

export class CreateBanDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  userNo: number;

  @ApiProperty()
  @Length(1, 100)
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  expireDays?: number;
}
