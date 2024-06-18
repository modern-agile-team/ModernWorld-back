import { Controller, Get, Query } from "@nestjs/common";
import { AlarmsService } from "./alarms.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { getAllAlarmsDto } from "./dtos/get-all-alarms.dto";

@Controller("alarms")
@ApiTags("Alarms")
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Get()
  @ApiOperation({ summary: "알람 조회" })
  getAllAlarms(@Query() queryParams: getAllAlarmsDto) {
    const userNo = 1;

    return this.alarmsService.getAllAlarms(userNo, queryParams);
  }
}