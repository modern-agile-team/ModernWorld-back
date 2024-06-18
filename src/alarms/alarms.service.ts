import { Injectable } from "@nestjs/common";
import { AlarmsRepository } from "./alarms.repository";
import { getAllAlarmsDto } from "./dtos/get-all-alarms.dto";

@Injectable()
export class AlarmsService {
  constructor(private readonly alarmsRepository: AlarmsRepository) {}

  async getAllAlarms(userNo: number, queryParams: getAllAlarmsDto) {
    const { take, page } = queryParams;
    const skip = take * (page - 1);

    await this.alarmsRepository.updateAlarmsStatusToTrueByUserNo(userNo);

    return this.alarmsRepository.getAllAlarmsByUserNo(userNo, take, skip);
  }
}
