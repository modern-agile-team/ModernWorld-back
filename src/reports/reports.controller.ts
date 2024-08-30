import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("reports")
@ApiTags("Reports")
export class ReportsController {
  @Get(":no")
  getOneReport() {}

  @Get()
  getReports() {}

  @Post()
  createOneReport() {}
}
