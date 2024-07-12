import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from "@nestjs/common";
import { AlarmsService } from "./alarms.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { ApiGetAlarms } from "./alarms-swagger/get-alarms.decorator";
import { ApiUpdateAlarmStatusToRead } from "./alarms-swagger/update-alarm-status-to-read.decorator";
import { ApiDeleteOneAlarm } from "./alarms-swagger/delete-one-alarm.decorator";

@Controller("users/alarms")
@ApiTags("Alarms")
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Get()
  @ApiGetAlarms()
  getAlarms(@Query() queryParams: PaginationDto) {
    const userNo = 1;

    return this.alarmsService.getAlarms(userNo, queryParams);
  }

  @Patch(":alarmNo")
  @ApiUpdateAlarmStatusToRead()
  updateAlarmStatusToRead(@Param("alarmNo", ParseIntPipe) alarmNo: number) {
    const userNo = 1;

    return this.alarmsService.updateAlarmStatusToTrue(alarmNo, userNo);
  }

  @Delete(":alarmNo")
  @HttpCode(204)
  @ApiDeleteOneAlarm()
  deleteOneAlarm(@Param("alarmNo", ParseIntPipe) alarmNo: number) {
    const userNo = 1;

    return this.alarmsService.deleteOneAlarm(userNo, alarmNo);
  }
}
