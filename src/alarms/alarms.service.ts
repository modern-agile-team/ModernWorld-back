import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AlarmsRepository } from "./alarms.repository";
import { getAllAlarmsDto } from "./dtos/get-all-alarms.dto";

@Injectable()
export class AlarmsService {
  constructor(private readonly alarmsRepository: AlarmsRepository) {}

  async getAllAlarms(userNo: number, queryParams: getAllAlarmsDto) {
    const { take, page } = queryParams;
    const skip = take * (page - 1);

    const alarms = await this.alarmsRepository.getAllAlarmsByUserNo(
      userNo,
      take,
      skip,
    );

    await this.alarmsRepository.updateAlarmsStatusToTrue(userNo);

    return alarms;
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
