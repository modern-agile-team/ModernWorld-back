import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BansRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBan(uniqueIdentifier: string, content: string, expiredAt: Date) {
    return this.prisma.ban.create({
      data: { content, uniqueIdentifier, expiredAt },
    });
  }
}
