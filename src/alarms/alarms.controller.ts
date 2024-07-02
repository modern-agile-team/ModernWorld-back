import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from "@nestjs/common";
import { AlarmsService } from "./alarms.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { getAlarmsDto } from "./dtos/get-alarms.dto";
import { userNo } from "src/auth/auth.decorator";

@Controller("alarms")
@ApiTags("Alarms")
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Get()
  @ApiOperation({ summary: "알람 조회" })
  getAlarms(@Query() queryParams: getAlarmsDto) {
    const userNo = 1;

    return this.alarmsService.getAlarms(userNo, queryParams);
  }

  @Patch(":alarmNo")
  @ApiOperation({ summary: "알람 읽음으로 처리" })
  updateAlarmStatusToRead(@Param("alarmNo", ParseIntPipe) alarmNo: number) {
    const userNo = 1;

    return this.alarmsService.updateAlarmStatusToTrue(alarmNo, userNo);
  }

  @Delete(":alarmNo")
  @ApiOperation({ summary: "알람 삭제" })
  deleteOneAlarm(@Param("alarmNo", ParseIntPipe) alarmNo: number) {
    const userNo = 1;

    return this.alarmsService.deleteOneAlarm(userNo, alarmNo);
  }
}
