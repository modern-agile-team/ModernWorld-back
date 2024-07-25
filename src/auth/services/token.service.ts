import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RedisService } from "../redis/redis.service";
import axios from "axios";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
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
  async createNewkakaoAccessToken(socialRefreshToken: string) {
    try {
      return (
        await axios.post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "refresh_token",
            client_id: this.configService.get<string>("KAKAO_CLIENT_ID"),
            refresh_token: socialRefreshToken,
            client_secret: this.configService.get<string>("KAKAO_CLIENT"),
          },
          {
            headers: {
              "Content-type":
                "Content-type: application/x-www-form-urlencoded;charset=utf-8",
            },
          },
        )
      ).data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        "카카오 액세스 토큰 재발급 중 서버에러가 발생했습니다.",
      );
    }
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
