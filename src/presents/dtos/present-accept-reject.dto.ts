import { IsEnum } from "class-validator";
import { AcceptReject } from "../enum/present-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class PresentAcceptRejectDto {
  @ApiProperty({
    enum: AcceptReject,
    description: "accept or reject",
  })
  @IsEnum(AcceptReject)
  status: AcceptReject;
}
