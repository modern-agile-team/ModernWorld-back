import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserNo } from "src/auth/auth.decorator";
import { AccessTokenAuthGuard } from "src/auth/jwt/jwt.guard";
import { CreateOneReportDto } from "./dtos/create-one-report.dto";
import { ReportsService } from "./reports.service";
import { ApiCreateOneReport } from "./swagger-decorators/create-one-report.decorator";
import { ApiGetAllReports } from "./swagger-decorators/get-all-reports.decorator";
import { ApiGetUserReports } from "./swagger-decorators/get-user-reports.decorator";
import { PaginationResponseDto } from "src/common/dtos/pagination-response.dto";
import { ReportsPaginationDto } from "./dtos/reports-pagination.dto";

@Controller()
@ApiTags("Reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("users/my/reports")
  @UseGuards(AccessTokenAuthGuard)
  @ApiGetUserReports()
  async getUserReports(
    @UserNo() userNo: number,
    @Query() query: ReportsPaginationDto,
  ) {
    const { reports, ...meta } = await this.reportsService.getUserReports(
      userNo,
      query,
    );

    return new PaginationResponseDto(reports, meta);
  }

  @Get("reports")
  @UseGuards(AccessTokenAuthGuard)
  @ApiGetAllReports()
  async getAllReports(
    @UserNo() userNo: number,
    @Query() query: ReportsPaginationDto,
  ) {
    const { reports, ...meta } = await this.reportsService.getAllReports(
      userNo,
      query,
    );

    return new PaginationResponseDto(reports, meta);
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
