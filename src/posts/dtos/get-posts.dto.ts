import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { SenderReceiverNoField } from "src/common/enum/sender-receiver-no.enum";

export class GetPostsDto {
  @ApiPropertyOptional({ enum: SenderReceiverNoField })
  @IsEnum(SenderReceiverNoField)
  @IsOptional()
  type: SenderReceiverNoField;
}
