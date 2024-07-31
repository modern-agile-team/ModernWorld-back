import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { BooleanTransform } from "src/common/decorators/boolean-transform.decorator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { SenderReceiverNoField } from "src/common/enum/sender-receiver-no.enum";

export class NeighborsPaginationDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "true 면 이웃 관계가 성립된 것들만, false면 요청만 조회",
    default: false,
  })
  @BooleanTransform()
  @IsOptional()
  status?: boolean = false;

  @ApiPropertyOptional({
    enum: SenderReceiverNoField,
    description:
      "recieverNo면 유저가 받은 것들만, senderNo면 유저가 보낸 것들만 조회, 보내지 않으면 전부 조회 (status가 false일때만 사용)",
  })
  @IsEnum(SenderReceiverNoField)
  @IsOptional()
  type?: SenderReceiverNoField;
}
