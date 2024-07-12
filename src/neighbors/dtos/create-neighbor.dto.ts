import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class CreateNeighborDto {
  @IsOptional()
  @IsInt()
  receiverNo: number;

  @IsBoolean()
  status: boolean;
}
