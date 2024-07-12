import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class UpdateNeighborDto {
  @IsInt()
  @IsOptional()
  no: number;

  @IsBoolean()
  status: boolean;
}
