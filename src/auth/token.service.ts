import { Injectable } from "@nestjs/common";
import { TokenRepository } from "src/auth/token.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createAccessToken(userId: string, userNo: number) {
    const payload = { userId, userNo };

    return this.jwtService.sign(payload, {
      expiresIn: "6h",
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
  }
  async createRefreshToken(userId: string, userNo: number) {
    const payload = { userId, userNo };

    return this.jwtService.sign(payload, {
      expiresIn: "7d",
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
  }
  // async setRefreshToken(userId: string, refreshToken: string): Promise<void> {
  //   const ttl = this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME"); // TTL 값 설정(리프레시 토큰 만료 시간을 TTL로 지정 만료 이후엔 캐시에서 토큰 삭제)
  //   await this.cacheService.set(`refreshToken:${userId}`, refreshToken, +ttl);
  // }
}