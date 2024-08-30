import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { BooleanTransform } from "src/common/decorators/boolean-transform.decorator";

export class GetUserItemsDto {
  @ApiPropertyOptional({ description: "테마이름" })
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiPropertyOptional({ description: "사용 여부" })
  @BooleanTransform()
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  itemName?: string;
}
