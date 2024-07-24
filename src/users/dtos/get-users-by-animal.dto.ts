import { IsEnum, IsOptional } from "class-validator";
import { Animal } from "../../common/enum/animal.enum";
import { ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { orderByField } from "../enum/orderByFeild.enum";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export class GetUsersByAnimalDto extends OmitType(PaginationDto, ["orderBy"]) {
  @ApiPropertyOptional({
    enum: Animal,
    description: "동물 분류",
  })
  @IsOptional()
  @IsEnum(Animal)
  animal?: Animal;

  @ApiPropertyOptional({
    enum: orderByField,
    default: "createdAt",
    description:
      "정렬 종류를 결정합니다. 값이 정해지지 않을시, 유저를 최신순으로 불러옵니다.",
  })
  @IsOptional()
  @IsEnum(orderByField)
  orderByField?: orderByField = orderByField.CREATEDAT;

  @ApiPropertyOptional({
    description: "검색할 유저 이름",
  })
  nickname?: string;
}
