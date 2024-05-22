import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Animal } from "src/common/enum/animal.enum";

export class GetCharactersDto {
  @ApiProperty({
    name: "species",
    enum: Animal,
    required: false,
    example: "cat",
  })
  @IsEnum(Animal)
  @IsOptional()
  species?: Animal;

  @ApiProperty({
    name: "characterName",
    type: String,
    required: false,
    example: "캐릭터 이름",
  })
  @IsOptional()
  characterName?: string;
}
