import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Animal } from "src/common/enum/animal.enum";

export class GetCharactersDto {
  @ApiPropertyOptional({
    name: "species",
    enum: Animal,
    required: false,
    example: "cat",
  })
  @IsEnum(Animal)
  @IsOptional()
  species?: Animal;

  @ApiPropertyOptional({
    name: "characterName",
    required: false,
    example: "캐릭터 이름",
  })
  @IsOptional()
  characterName?: string;
}
