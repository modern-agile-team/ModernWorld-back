import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  createAccessToken(userNo: number) {
    const payload = { sub: "accessToken", userNo };

    return this.jwtService.sign(payload, {
      expiresIn: "12h",
      secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
    });
  }

  createRefreshToken(userNo: number) {
    const payload = { sub: "refreshToken", userNo };

    return this.jwtService.sign(payload, {
      expiresIn: "7d",
      secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
    });
  }

  async createNewAccessToken(userNo: number) {
    const accessToken = this.createAccessToken(userNo);
    this.setAccessToken(`${userNo}-accessToken`, accessToken, 60 * 60 * 12);

    return { accessToken };
  }

  setRefreshToken(userNo: string, refreshToken: string, ttl: number) {
    return this.redisService.setToken(userNo, refreshToken, ttl);
  }

  setAccessToken(userNo: string, accessToken: string, ttl: number) {
    return this.redisService.setToken(userNo, accessToken, ttl);
  }

  getRefreshToken(userNo: string) {
    return this.redisService.getToken(userNo);
  }

  getAccessToken(userNo: string) {
    return this.redisService.getToken(userNo);
  }

  delRefreshToken(userNo: string) {
    return this.redisService.delToken(userNo);
  }

  delAccessToken(userNo: string) {
    return this.redisService.delToken(userNo);
  }
}
