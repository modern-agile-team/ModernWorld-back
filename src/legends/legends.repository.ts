import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateLegendCount } from "./interfaces/update-legend-count.interface";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class LegendsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUserLegend(userNo: number) {
    return this.prisma.legend.create({ data: { userNo } });
  }

  getAllLegendsByUserNo(userNo: number) {
    return this.prisma.legend.findUnique({ where: { userNo } });
  }

  updateOneLegendByUserNo<T extends keyof UpdateLegendCount>(
    userNo: number,
    data: Pick<UpdateLegendCount, T>,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).legend.update({
      data,
      where: { userNo },
    });
  }
}
