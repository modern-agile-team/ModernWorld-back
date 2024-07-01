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
      where: { userNo },
      take,
      skip,
      orderBy: { no: "desc" },
    });
  }

  findOneAlarm(alarmNo: number): PrismaPromise<alarm> {
    return this.prisma.alarm.findUnique({ where: { no: alarmNo } });
  }

  createOneAlarm(
    userNo: number,
    content: string,
    url: string,
  ): PrismaPromise<alarm> {
    return this.prisma.alarm.create({ data: { userNo, content, url } });
  }

  updateAlarmsStatusToTrue(userNo: number): PrismaPromise<{ count: number }> {
    return this.prisma.alarm.updateMany({
      data: { status: true },
      where: { userNo, status: false },
    });
  }

  deleteOneAlarmByAlarmNo(alarmNo: number): PrismaPromise<alarm> {
    return this.prisma.alarm.delete({ where: { no: alarmNo } });
  }
}
