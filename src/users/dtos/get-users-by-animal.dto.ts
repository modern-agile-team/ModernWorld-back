import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Animal } from "../../common/enum/animal.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { orderByField } from "../enum/orderByFeild-enum";

export class GetUsersByAnimalDto {
  @ApiProperty({
    name: "pageNo",
    description: "페이지 번호",
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  pageNo: number;

  @ApiProperty({
    name: "take",
    description: "가져올 자료 개수",
    example: 10,
  })
  @Type(() => Number)
  @IsNumber()
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

  @ApiProperty({
    name: "orderByField",
    description: "정렬 종류 (like, accumulationPoint, createdAt)",
    example: "like",
  })
  @IsEnum(orderByField)
  orderByField: string;

  @ApiPropertyOptional({
    name: "nickname",
    description: "검색할 유저 이름",
    example: "엄준식",
  })
  @IsOptional()
  nickname?: string;
}
