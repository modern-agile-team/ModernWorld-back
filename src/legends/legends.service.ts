import { Injectable } from "@nestjs/common";
import { LegendsRepository } from "./legends.repository";

@Injectable()
export class LegendsService {
  constructor(private readonly legendsRepository: LegendsRepository) {}

  getAllLendsByUserNo(userNo: number) {
    return this.legendsRepository.getAllLegendsByUserNo(userNo);
  }
}
