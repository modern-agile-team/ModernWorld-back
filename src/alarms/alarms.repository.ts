import { Injectable } from "@nestjs/common";
import { PrismaPromise, alarm } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AlarmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllAlarmsByUserNo(
    userNo: number,
    take: number,
    skip: number,
  ): PrismaPromise<alarm[]> {
    return this.prisma.alarm.findMany({
      select: {
        no: true,
        userNo: true,
        content: true,
        status: true,
        createdAt: true,
      },
      where: { userNo },
      take,
      skip,
      orderBy: { no: "desc" },
    });
  }

  createOneAlarm(userNo: number, content: string): PrismaPromise<alarm> {
    return this.prisma.alarm.create({ data: { userNo, content } });
  }

  updateAlarmsStatusToTrueByUserNo(
    userNo: number,
  ): PrismaPromise<{ count: number }> {
    return this.prisma.alarm.updateMany({
      data: { status: true },
      where: { userNo, status: false },
    });
  }
}
