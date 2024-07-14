import { ApiPropertyOptional } from "@nestjs/swagger";
import { SenderReceiverNoField } from "../enum/present-senderReceiverNo.enum";
import { IsEnum, IsOptional } from "class-validator";

export class GetUserPresentsDto {
  @ApiPropertyOptional({
    enum: SenderReceiverNoField,
    description: "발신 / 수신",
  })
  @IsEnum(SenderReceiverNoField)
  @IsOptional()
  type: SenderReceiverNoField;
}
