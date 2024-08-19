import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  saveTokens(userNo: number, socialAccess: string, socialRefresh: string) {
    return this.prisma.token.create({
      data: {
        userNo,
        socialAccess,
        socialRefresh,
      },
    });
  }

  findToken(userNo: number) {
    return this.prisma.token.findUnique({
      where: {
        userNo,
      },
    });
  }

  deleteTokens(userNo: number) {
    return this.prisma.token.delete({
      where: {
        userNo,
      },
    });
  }

  updateAccessToken(userNo: number, socialAccess: string) {
    return this.prisma.token.update({
      where: {
        userNo,
      },
      data: {
        socialAccess,
      },
    });
  }

  updateTokens(userNo: number, socialAccess: string, socialRefresh: string) {
    return this.prisma.token.update({
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
