import { ApiProperty } from "@nestjs/swagger";

export class CreateBanDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  expiredAt: Date;
}
