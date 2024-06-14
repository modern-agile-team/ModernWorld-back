import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { Animal } from "src/common/enum/animal.enum";

export class GetCharactersDto {
  @ApiPropertyOptional({
    name: "species",
    enum: Animal,
    example: "cat",
  })
  @IsEnum(Animal)
  @IsOptional()
  species?: Animal;

  @ApiPropertyOptional({
    name: "characterName",
    example: "캐릭터 이름",
  })
  characterName?: string;
}
