import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateLegendCount } from "./interfaces/update-legend-count.interface";

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
  ) {
    return this.prisma.legend.update({
      data,
      where: { userNo },
    });
  }
}
