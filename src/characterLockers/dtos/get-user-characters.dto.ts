import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { BooleanTransform } from "src/common/decorators/boolean-transform.decorator";
import { Animal } from "src/common/enum/animal.enum";

export class GetUserCharactersDto {
  @ApiPropertyOptional({ description: "사용 여부" })
  @BooleanTransform()
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional({ enum: Animal })
  @IsEnum(Animal)
  @IsOptional()
  species?: Animal;
}
