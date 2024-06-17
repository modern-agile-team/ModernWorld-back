import { Injectable } from "@nestjs/common";
import { AlarmsRepository } from "./alarms.repository";

@Injectable()
export class AlarmsService {
  constructor(private readonly alarmsRepository: AlarmsRepository) {}
  getAllAlarms() {}

  getOneAlar() {}
}
