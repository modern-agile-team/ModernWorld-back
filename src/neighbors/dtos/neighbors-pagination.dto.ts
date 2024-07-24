import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { BooleanTransform } from "src/common/decorators/boolean-transform.decorator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { SenderReceiverNoField } from "src/common/enum/sender-receiver-no.enum";

export class NeighborsPaginationDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "이웃 / 이웃 아님 상태",
    default: false,
  })
  @BooleanTransform()
  @IsOptional()
  status?: boolean = false;

  @ApiPropertyOptional({
    enum: SenderReceiverNoField,
    description: "쓴것 / 받은것 (status 값이 false일때만 사용)",
  })
  @IsEnum(SenderReceiverNoField)
  @IsOptional()
  type?: SenderReceiverNoField;
}
