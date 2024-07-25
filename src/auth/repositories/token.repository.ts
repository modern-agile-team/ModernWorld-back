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

  async findToken(userNo: number) {
    return this.prisma.token.findMany({
      where: {
        userNo,
      },
    });
  }

  async deleteTokens(userNo: number) {
    return this.prisma.token.deleteMany({
      where: {
        userNo,
      },
    });
  }

  async updateTokens(
    userNo: number,
    socialAccess: string,
    socialRefresh: string,
  ) {
    return this.prisma.token.updateMany({
      where: {
        userNo,
      },
      data: {
        socialAccess,
        socialRefresh,
      },
    });
  }
}
