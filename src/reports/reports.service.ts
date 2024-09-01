import { Injectable } from "@nestjs/common";
import { CreateOneReportDto } from "./dtos/create-one-report.dto";
import { ReportsRepository } from "./reports.repository";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { UsersRepository } from "src/users/users.repository";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getAllReports(userNo: number, query: PaginationDto) {
    await this.usersService.checkAdmin(userNo);

    const { page, take, orderBy } = query;

    const skip = (page - 1) * take;

    const totalCount = await this.reportsRepository.countReports();

    const totalPage = Math.ceil(totalCount / take);

    const reports = await this.reportsRepository.getReports(
      skip,
      take,
      orderBy,
    );

    return { reports, page, take, totalCount, totalPage };
  }

  async getUserReports(userNo: number, query: PaginationDto) {
    const { page, take, orderBy } = query;

    const skip = (page - 1) * take;

    const where = { senderNo: userNo };

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
