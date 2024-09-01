import { Injectable } from "@nestjs/common";
import { CreateOneReportDto } from "./dtos/create-one-report.dto";
import { ReportsRepository } from "./reports.repository";
import { UsersService } from "src/users/users.service";
import { ReportsPaginationDto } from "./dtos/reports-pagination.dto";

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getAllReports(userNo: number, query: ReportsPaginationDto) {
    await this.usersService.checkAdmin(userNo);

    const { page, take, orderBy, category } = query;

    const skip = (page - 1) * take;

    const where = { category };

    const totalCount = await this.reportsRepository.countReports(where);

    const totalPage = Math.ceil(totalCount / take);

    const reports = await this.reportsRepository.getReports(
      skip,
      take,
      orderBy,
      where,
    );

    return { reports, page, take, totalCount, totalPage };
  }

  async getUserReports(userNo: number, query: ReportsPaginationDto) {
    const { page, take, orderBy, category } = query;

    const skip = (page - 1) * take;

    const where = { senderNo: userNo, category };

    const totalCount = await this.reportsRepository.countReports(where);

    const totalPage = Math.ceil(totalCount / take);

    const reports = await this.reportsRepository.getReports(
      skip,
      take,
      orderBy,
      where,
    );

    return { reports, page, take, totalCount, totalPage };
  }

  async createOneReport(senderNo: number, body: CreateOneReportDto) {
    await this.usersService.userExists(body.receiverNo);

    return this.reportsRepository.createOneReport({ senderNo, ...body });
  }
}
