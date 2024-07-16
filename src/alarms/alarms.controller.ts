import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
} from "@nestjs/common";
import { AlarmsService } from "./alarms.service";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { ApiGetAlarms } from "./alarms-swagger/get-alarms.decorator";
import { ApiUpdateAlarmStatusToRead } from "./alarms-swagger/update-alarm-status-to-read.decorator";
import { ApiDeleteOneAlarm } from "./alarms-swagger/delete-one-alarm.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";

@Controller("users/my/alarms")
@ApiTags("Alarms")
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Get()
  @ApiGetAlarms()
  getAlarms(@Query() query: PaginationDto) {
    const userNo = 1;

    return this.alarmsService.getAlarms(userNo, query);
  }

  @Patch(":alarmNo")
  @ApiUpdateAlarmStatusToRead()
  updateAlarmStatusToRead(
    @Param("alarmNo", ParsePositiveIntPipe) alarmNo: number,
  ) {
    const userNo = 1;

    return this.alarmsService.updateAlarmStatusToTrue(alarmNo, userNo);
  }

  @Delete(":alarmNo")
  @HttpCode(204)
  @ApiDeleteOneAlarm()
  deleteOneAlarm(@Param("alarmNo", ParsePositiveIntPipe) alarmNo: number) {
    const userNo = 1;

    return this.alarmsService.deleteOneAlarm(userNo, alarmNo);
  }
}
