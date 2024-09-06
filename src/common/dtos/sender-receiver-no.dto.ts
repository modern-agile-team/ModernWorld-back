import { ApiPropertyOptional } from "@nestjs/swagger";
import { SenderReceiverNoField } from "../enum/sender-receiver-no.enum";
import { IsEnum, IsOptional } from "class-validator";

export class SenderReceiverNoDto {
  @ApiPropertyOptional({
    enum: SenderReceiverNoField,
    description: "발신 / 수신",
  })
  @IsEnum(SenderReceiverNoField)
  @IsOptional()
  type?: SenderReceiverNoField;
}
