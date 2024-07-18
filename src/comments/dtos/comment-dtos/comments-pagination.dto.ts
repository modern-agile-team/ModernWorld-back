import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { SenderReceiverNoField } from "src/common/enum/sender-receiver-no.enum";

export class CommentsPaginationDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: SenderReceiverNoField,
    description: "쓴것 / 받은것",
  })
  @IsEnum(SenderReceiverNoField)
  @IsOptional()
  type: SenderReceiverNoField;
}
