import { Injectable } from "@nestjs/common";
import { PrismaPromise, legend } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateLegendCount } from "./interfaces/update-legend-count.interface";

@Injectable()
export class LegendsRepository {
  constructor(private readonly prisma: PrismaService) {}

  updateLegendByUserNo(
    userNo: number,
    data: UpdateLegendCount,
  ): PrismaPromise<legend> {
    return this.prisma.legend.update({
      data,
      where: { userNo },
    });
  }
}
