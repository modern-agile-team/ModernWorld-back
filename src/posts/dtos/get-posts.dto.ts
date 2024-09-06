import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { OrderBy } from "src/common/enum/order-by.enum";
import { SenderReceiverNoField } from "src/common/enum/sender-receiver-no.enum";

export class GetPostsDto {
  @ApiPropertyOptional({ enum: SenderReceiverNoField })
  @IsEnum(SenderReceiverNoField)
  @IsOptional()
  type?: SenderReceiverNoField;

  @ApiPropertyOptional({ enum: OrderBy, default: OrderBy.DESC })
  @IsEnum(OrderBy)
  @IsOptional()
  orderBy: OrderBy = OrderBy.DESC;
}
