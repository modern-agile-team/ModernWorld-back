import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AlarmsService } from "./alarms.service";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { ApiGetAlarms } from "./alarms-swagger/get-alarms.decorator";
import { ApiUpdateAlarmStatusToRead } from "./alarms-swagger/update-alarm-status-to-read.decorator";
import { ApiDeleteOneAlarm } from "./alarms-swagger/delete-one-alarm.decorator";
import { ParsePositiveIntPipe } from "src/common/pipes/parse-positive-int.pipe";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { userNo } from "src/auth/auth.decorator";

@Controller("users/my/alarms")
@ApiTags("Alarms")
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Get()
  @ApiGetAlarms()
  @UseGuards(AccessTokenAuthGuard)
  getAlarms(@userNo() userNo: number, @Query() query: PaginationDto) {
    return this.alarmsService.getAlarms(userNo, query);
  }

  @Patch(":alarmNo")
  @ApiUpdateAlarmStatusToRead()
  @UseGuards(AccessTokenAuthGuard)
  updateAlarmStatusToRead(
    @userNo() userNo: number,
    @Param("alarmNo", ParsePositiveIntPipe) alarmNo: number,
  ) {
    return this.alarmsService.updateAlarmStatusToTrue(alarmNo, userNo);
  }

  @Delete(":alarmNo")
  @ApiDeleteOneAlarm()
  @HttpCode(204)
  @UseGuards(AccessTokenAuthGuard)
  deleteOneAlarm(
    @userNo() userNo: number,
    @Param("alarmNo", ParsePositiveIntPipe) alarmNo: number,
  ) {
    return this.alarmsService.deleteOneAlarm(userNo, alarmNo);
  }
}
