import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";
import { ReportsRepository } from "./reports.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository],
})
export class ReportsModule {}
