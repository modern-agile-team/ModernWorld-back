import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { Animal } from "src/common/enum/animal.enum";

export class GetCharactersDto {
  @ApiPropertyOptional({
    name: "species",
    enum: Animal,
    description: "강아지 / 고양이",
  })
  @IsEnum(Animal)
  @IsOptional()
  species?: Animal;

  @ApiPropertyOptional({
    name: "characterName",
    description: "캐릭터 이름",
  })
  characterName?: string;
}
