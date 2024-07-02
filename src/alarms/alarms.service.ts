import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AlarmsRepository } from "./alarms.repository";
import { getAlarmsDto } from "./dtos/get-alarms.dto";

@Injectable()
export class AlarmsService {
  constructor(private readonly alarmsRepository: AlarmsRepository) {}

  async getAlarms(userNo: number, queryParams: getAlarmsDto) {
    const { take, page } = queryParams;
    const skip = take * (page - 1);

    const totalCount = await this.alarmsRepository.countAlarmsByUserNo(userNo);

    const alarms = await this.alarmsRepository.getAlarmsByUserNo(
      userNo,
      take,
      skip,
    );

    const totalPage = Math.ceil(totalCount / take);

    return { data: alarms, meta: { page, take, totalCount, totalPage } };
  }

  async deleteOneAlarm(userNo: number, alarmNo: number) {
    const alarm = await this.alarmsRepository.findOneAlarm(alarmNo);

    if (!alarm) {
      throw new NotFoundException("This alarm doesn't exist.");
    }

    if (userNo !== alarm.userNo) {
      throw new ForbiddenException("This alarm is not related with user.");
    }

    return this.alarmsRepository.deleteOneAlarmByAlarmNo(alarmNo);
  }
}
