import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Animal, orderByField } from "../enum/animal-enum";

export class GetUsersByAnimalDto {
  @Type(() => Number)
  @IsNumber()
  take: number;

  @IsOptional()
  @IsEnum(Animal)
  animal?: string;

  @IsEnum(orderByField)
  orderByField: string;

  @IsOptional()
  @IsString()
  userName?: string;
}
