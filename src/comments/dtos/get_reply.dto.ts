import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetReplyDto {
  @Type(() => Number)
  @IsInt()
  page: number;

  @Type(() => Number)
  @IsInt()
  take: number;
}
