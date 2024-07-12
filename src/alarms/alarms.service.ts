import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AlarmsRepository } from "./alarms.repository";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";
import { alarm } from "@prisma/client";

@Injectable()
export class AlarmsService {
  constructor(private readonly alarmsRepository: AlarmsRepository) {}

  async getAlarms(userNo: number, queryParams: PaginationDto) {
    const { take, page, orderBy } = queryParams;
    const skip = take * (page - 1);
    const totalCount = await this.alarmsRepository.countAlarmsByUserNo(userNo);
    const alarms = await this.alarmsRepository.getAlarmsByUserNo(
      userNo,
      take,
      skip,
      orderBy,
    );
    const totalPage = Math.ceil(totalCount / take);

    return new PaginationResponseDto<alarm>(alarms, {
      page,
      take,
      totalCount,
      totalPage,
    });
  }

  async updateAlarmStatusToTrue(alarmNo: number, userNo: number) {
    await this.checkOneAlarmOfUser(alarmNo, userNo);

    return this.alarmsRepository.updateAlarmStatusToTrue(alarmNo);
  }

  async deleteOneAlarm(userNo: number, alarmNo: number) {
    await this.checkOneAlarmOfUser(alarmNo, userNo);

    return this.alarmsRepository.deleteOneAlarmByAlarmNo(alarmNo);
  }

  async checkOneAlarmOfUser(alarmNo: number, userNo: number) {
    const alarm = await this.alarmsRepository.findOneAlarm(alarmNo);

    if (!alarm) {
      throw new NotFoundException("This alarm doesn't exist.");
    }

    if (userNo !== alarm.userNo) {
      throw new ForbiddenException("This alarm is not related with user.");
    }
  }
}
