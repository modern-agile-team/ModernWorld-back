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

@Controller("alarms")
@ApiTags("Alarms")
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Get()
  @ApiOperation({ summary: "알람 조회" })
  getAlarms(@Query() queryParams: PaginationDto) {
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
  @HttpCode(204)
  @ApiOperation({ summary: "알람 삭제" })
  deleteOneAlarm(@Param("alarmNo", ParseIntPipe) alarmNo: number) {
    const userNo = 1;

    return this.alarmsService.deleteOneAlarm(userNo, alarmNo);
  }
}
