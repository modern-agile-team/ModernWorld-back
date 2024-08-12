import { Injectable } from "@nestjs/common";
import { OrderBy } from "src/common/enum/order-by.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaTxType } from "src/prisma/prisma.type";

@Injectable()
export class AlarmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  countAlarmsByUserNo(userNo: number) {
    return this.prisma.alarm.count({ where: { userNo } });
  }

  getAlarmsByUserNo(
    userNo: number,
    take: number,
    skip: number,
    orderBy: OrderBy,
  ) {
    return this.prisma.alarm.findMany({
      where: { userNo },
      take,
      skip,
      orderBy: { no: orderBy },
    });
  }

  findOneAlarm(alarmNo: number) {
    return this.prisma.alarm.findUnique({ where: { no: alarmNo } });
  }

  createOneAlarm(
    userNo: number,
    content: string,
    title?: string,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).alarm.create({
      data: { userNo, content, title },
    });
  }

  updateAlarmStatusToTrue(alarmNo: number) {
    return this.prisma.alarm.update({
      data: { status: true },
      where: { no: alarmNo },
    });
  }

  deleteOneAlarmByAlarmNo(alarmNo: number) {
    return this.prisma.alarm.delete({ where: { no: alarmNo } });
  }
}
