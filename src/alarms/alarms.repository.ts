import { Injectable } from "@nestjs/common";
import { PrismaPromise, alarm } from "@prisma/client";
import { userNo } from "src/auth/auth.decorator";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AlarmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  countAlarmsByUserNo(userNo: number): PrismaPromise<number> {
    return this.prisma.alarm.count({ where: { userNo } });
  }

  getAlarmsByUserNo(
    userNo: number,
    take: number,
    skip: number,
    orderBy: OrderBy,
  ): PrismaPromise<alarm[]> {
    return this.prisma.alarm.findMany({
      where: { userNo },
      take,
      skip,
      orderBy: { no: orderBy },
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

  updateAlarmStatusToTrue(alarmNo: number): PrismaPromise<alarm> {
    return this.prisma.alarm.update({
      data: { status: true },
      where: { no: alarmNo },
    });
  }

  deleteOneAlarmByAlarmNo(alarmNo: number): PrismaPromise<alarm> {
    return this.prisma.alarm.delete({ where: { no: alarmNo } });
  }
}
