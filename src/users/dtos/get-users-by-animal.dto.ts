import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Animal, orderByField } from "../enum/animal-enum";
import { ApiProperty } from "@nestjs/swagger";

export class GetUsersByAnimalDto {
  @ApiProperty({
    name: "take",
    required: true,
    description: "가져올 자료 개수",
    example: 10,
  })
  @Type(() => Number)
  @IsNumber()
  take: number;

  @ApiProperty({
    name: "animal",
    required: false,
    description: "동물 종류 (cat, dog)",
    example: "dog",
  })
  @IsOptional()
  @IsEnum(Animal)
  animal?: string;

  @ApiProperty({
    name: "orderByField",
    description: "정렬 종류 (like, accumulationPoint, createdAt)",
    required: true,
    example: "like",
  })
  @IsEnum(orderByField)
  orderByField: string;

  @ApiProperty({
    name: "nickname",
    required: false,
    description: "검색할 유저 이름",
    example: "엄준식",
  })
  @IsOptional()
  @IsString()
  nickname?: string;
}
