import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BansRepository {
  constructor(private readonly prisma: PrismaService) {}

  createBan(uniqueIdentifier: string, content: string, expiredAt?: Date) {
    return this.prisma.ban.create({
      data: { content, uniqueIdentifier, expiredAt },
    });
  }

  findBanByUniqueIdentifier(uniqueIdentifier: string) {
    return this.prisma.ban.findUnique({ where: { uniqueIdentifier } });
  }

  deleteBanByUniqueIdentifier(uniqueIdentifier: string) {
    return this.prisma.ban.delete({ where: { uniqueIdentifier } });
  }
}
