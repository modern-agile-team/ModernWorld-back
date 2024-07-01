import { Injectable } from "@nestjs/common";
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

  async setRefreshToken(userNo: string, refreshToken: string, ttl: number) {
    return this.redisService.setToken(userNo, refreshToken, ttl);
  }

  async setAccessToken(userNo: string, accessToken: string, ttl: number) {
    return this.redisService.setToken(userNo, accessToken, ttl);
  }
}
