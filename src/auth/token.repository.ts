import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveTokens(
    userId: string,
    socialAccessToken: string,
    socialRefreshToken: string,
    refreshToken: string,
  ) {
    // return this.prisma.token.create({
    //   data: {
    //     userId,
    //     socialAccessToken,
    //     socialRefreshToken,
    //     refreshToken,
    //   },
    // });
  }
}
