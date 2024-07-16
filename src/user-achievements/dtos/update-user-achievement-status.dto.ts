import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class updateUserAchievementStatusDto {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
