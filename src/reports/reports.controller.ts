import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserNo } from "src/auth/auth.decorator";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { CreateOneReportDto } from "./dtos/create-one-report.dto";
import { ReportsService } from "./reports.service";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { ApiCreateOneReport } from "./swagger-decorators/create-one-report.decorator";
import { ApiGetReports } from "./swagger-decorators/get-reports.decorator";
import { ApiGetUserReports } from "./swagger-decorators/get-user-reports.decorator";

@Controller()
@ApiTags("Reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("users/my/reports")
  @UseGuards(AccessTokenAuthGuard)
  @ApiGetUserReports()
  getUserReports(@UserNo() userNo: number, @Query() query: PaginationDto) {
    return this.reportsService.getReports(userNo, query);
  }

  @Get("reports")
  @UseGuards(AccessTokenAuthGuard)
  @ApiGetReports()
  getReports(@UserNo() userNo: number, @Query() query: PaginationDto) {
    return this.reportsService.getReports(userNo, query);
  }

  @Post("reports")
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreateOneReport()
  createOneReport(
    @UserNo() senderNo: number,
    @Body() body: CreateOneReportDto,
  ) {
    return this.reportsService.createOneReport(senderNo, body);
  }
}
