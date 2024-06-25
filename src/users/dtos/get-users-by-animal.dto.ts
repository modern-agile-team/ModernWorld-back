import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { Animal } from "../../common/enum/animal.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { orderByField } from "../enum/orderByFeild.enum";

export class GetUsersByAnimalDto {
  @ApiProperty({
    name: "pageNo",
    description: "페이지 번호",
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pageNo: number;

  @ApiProperty({
    name: "take",
    description: "가져올 자료 개수",
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  take: number;

  @ApiPropertyOptional({
    name: "animal",
    enum: Animal,
    description: "동물 분류",
    example: "dog",
  })
  @IsOptional()
  @IsEnum(Animal)
  animal?: Animal;

  @ApiPropertyOptional({
    name: "orderByField",
    enum: orderByField,
    description:
      "정렬 종류를 결정합니다. 값이 정해지지 않을시, 유저를 최신순으로 불러옵니다.",
    example: "like",
  })
  @IsOptional()
  @IsEnum(orderByField)
  orderByField?: orderByField;

  @ApiPropertyOptional({
    name: "nickname",
    description: "검색할 유저 이름",
    example: "엄준식",
  })
  nickname?: string;
}
