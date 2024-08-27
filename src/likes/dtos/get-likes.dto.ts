import { ApiPropertyOptional } from "@nestjs/swagger";
import { SenderReceiverNoDto } from "src/common/dtos/sender-receiver-no.dto";
import { SenderReceiverNoField } from "src/common/enum/sender-receiver-no.enum";

export class GetLikesDto extends SenderReceiverNoDto {
  @ApiPropertyOptional({
    default: SenderReceiverNoField.RECEIVERNO,
  })
  type?: SenderReceiverNoField = SenderReceiverNoField.RECEIVERNO;
}
