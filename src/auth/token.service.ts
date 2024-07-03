import { Injectable, NotFoundException } from "@nestjs/common";
import { TokenRepository } from "src/auth/token.repository";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "./redis.service";

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  createAccessToken(userNo: number) {
    const payload = { sub: "accessToken", userNo };

    return this.jwtService.sign(payload, {
      expiresIn: "3h",
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  createRefreshToken(userNo: number) {
    const payload = { sub: "refreshToken", userNo };

    return this.jwtService.sign(payload, {
      expiresIn: "7d",
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
  }

  async createNewAccessToken(userNo: number) {
    const refreshToken = this.getRefreshToken(`${userNo}-refreshToken`);
    if (!refreshToken) {
      throw new NotFoundException("리프레쉬 토큰이 존재하지 않습니다.");
    }
    const accessToken = this.createAccessToken(userNo);
    const a = await this.setAccessToken(
      `${userNo}-accessToken`,
      accessToken,
      60 * 60 * 3,
    );

    return { accessToken };
  }

  setRefreshToken(userNo: string, refreshToken: string, ttl: number) {
    return this.redisService.setToken(userNo, refreshToken, ttl);
  }

  setAccessToken(userNo: string, accessToken: string, ttl: number) {
    return this.redisService.setToken(userNo, accessToken, ttl);
  }

  async getRefreshToken(userNo: string) {
    return this.redisService.getToken(userNo);
  }
}
