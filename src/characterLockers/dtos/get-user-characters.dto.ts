import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { Animal } from "src/common/enum/animal.enum";

export class GetUserCharactersDto {
  @ApiPropertyOptional({})
  @Type(() => Boolean)
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional({ enum: Animal })
  @IsEnum(Animal)
  @IsOptional()
  species?: Animal;
}
