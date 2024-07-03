import { Injectable } from "@nestjs/common";
import { PrismaPromise, legend } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateLegendType } from "./type/update-legend.type";

@Injectable()
export class LegendsRepository {
  constructor(private readonly prisma: PrismaService) {}

  updateLegendByUserNo(
    userNo: number,
    data: UpdateLegendType,
  ): PrismaPromise<legend> {
    return this.prisma.legend.update({
      data,
      where: { userNo },
    });
  }
}
