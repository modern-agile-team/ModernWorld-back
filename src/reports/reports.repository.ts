import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReportsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getReports(
    skip: number,
    take: number,
    orderBy: Prisma.SortOrder,
    where?: Prisma.reportWhereInput,
  ) {
    return this.prisma.report.findMany({
      select: {
        no: true,
        sender: { select: { no: true, nickname: true } },
        receiver: { select: { no: true, nickname: true } },
        content: true,
        createdAt: true,
        category: true,
      },
      skip,
      take,
      orderBy: { no: orderBy },
      where,
    });
  }

  createOneReport(data: Prisma.reportCreateManyInput) {
    return this.prisma.report.create({
      select: {
        no: true,
        sender: { select: { no: true, nickname: true } },
        receiver: { select: { no: true, nickname: true } },
        content: true,
        createdAt: true,
        category: true,
      },
      data,
    });
  }
}
