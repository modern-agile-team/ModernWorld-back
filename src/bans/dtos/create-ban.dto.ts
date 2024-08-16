import { ApiProperty } from "@nestjs/swagger";

export class CreateBanDto {
  @ApiProperty()
  userNo: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  expireDays: number;
}
