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
    private readonly usersRepository: UsersRepository,
  ) {}

  getOneReport() {}

  async getReports(userNo: number, query: PaginationDto) {
    const { admin } = await this.usersRepository.isAdmin(userNo);

    const { page, take, orderBy } = query;

    const skip = (page - 1) * take;

    if (admin) return this.reportsRepository.getReports(skip, take, orderBy);

    const where = { senderNo: userNo };

    return this.reportsRepository.getReports(skip, take, orderBy, where);
  }

  async createOneReport(senderNo: number, body: CreateOneReportDto) {
    await this.usersService.userExists(body.receiverNo);

    return this.reportsRepository.createOneReport({ senderNo, ...body });
  }
}
