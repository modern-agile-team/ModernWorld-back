import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveTokens(
    userNo: number,
    socialAccess: string,
    socialRefresh: string,
  ) {
    return this.prisma.token.create({
      data: {
        userNo,
        socialAccess,
        socialRefresh,
      },
    });
  }
}
