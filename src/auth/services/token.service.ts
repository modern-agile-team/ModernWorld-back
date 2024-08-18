import {
  ForbiddenException,
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

  async createNewNaverAccessToken(socialRefreshToken: string) {
    try {
      const naverTokenUrl = "https://nid.naver.com/oauth2.0/token";
      const naverTokenData = {
        grant_type: "refresh_token",
        client_id: this.configService.get<string>("NAVER_CLIENT_ID"),
        client_secret: this.configService.get<string>("NAVER_CLIENT_SECRET"),
        refresh_token: socialRefreshToken,
      };
      return (
        await axios.get(naverTokenUrl, {
          params: naverTokenData,
        })
      ).data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        "네이버 액세스 토큰 재발급 중 서버에러가 발생했습니다.",
      );
    }
  }

  async createNewkakaoAccessToken(socialRefreshToken: string) {
    try {
      const kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
      const kakaoTokenHeader = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      };
      const kakaoTokenData = {
        grant_type: "refresh_token",
        client_id: this.configService.get<string>("KAKAO_CLIENT_ID"),
        refresh_token: socialRefreshToken,
        client_secret: this.configService.get<string>("KAKAO_CLIENT_SECRET"),
      };
      return (await axios.post(kakaoTokenUrl, kakaoTokenData, kakaoTokenHeader))
        .data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        "카카오 액세스 토큰 재발급 중 서버에러가 발생했습니다.",
      );
    }
  }

  async createNewGoogleAccessToken(socialRefreshToken: string) {
    try {
      const googleTokenUrl = "https://oauth2.googleapis.com/token";

      const tokenBody = {
        client_id: this.configService.get<string>("GOOGLE_CLIENT_ID"),
        client_secret: this.configService.get<string>("GOOGLE_CLIENT_SECRET"),
        refresh_token: socialRefreshToken,
        grant_type: "refresh_token",
      };
      return (await axios.post(googleTokenUrl, tokenBody)).data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        "구글 액세스 토큰 재발급 중 서버에러가 발생했습니다.",
      );
    }
  }

  async naverSocialAccessTokenInfo(accessToken: string) {
    try {
      const naverTokenInfoUrl = "https://openapi.naver.com/v1/nid/me";
      const naverTokenInfoHeader = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(naverTokenInfoUrl, naverTokenInfoHeader);
      return response.data;
    } catch (error) {
      if (error.response.data.resultcode === "024") {
        return 401;
      } else {
        this.logger.error(error);
        throw new ForbiddenException("네이버 토큰 유효성 검사 오류");
      }
    }
  }

  async kakaoSocialAccessTokenInfo(accessToken: string) {
    try {
      const kakaoTokenInfoUrl =
        "https://kapi.kakao.com/v1/user/access_token_info";
      const kakaoTokenInfoHeader = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(kakaoTokenInfoUrl, kakaoTokenInfoHeader);
      return response.data;
    } catch (error) {
      if (error.response.data.code === -401) {
        return 401;
      } else {
        this.logger.error(error);
        throw new ForbiddenException("카카오 토큰 유효성 검사 오류");
      }
    }
  }

  async googleSocialAccessTokenInfo(accessToken: string) {
    try {
      const googleTokenInfoUrl =
        "https://www.googleapis.com/oauth2/v2/tokeninfo";
      const googleTokenInfoData = {
        access_token: accessToken,
      };
      const response = await axios.get(googleTokenInfoUrl, {
        params: googleTokenInfoData,
      });
      return response.data;
    } catch (error) {
      if (error.response.data.error_description === "Invalid Value") {
        return 401;
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException("구글 토큰 유효성 검사 오류");
      }
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

  async delAllRedisTokens(userNo: string) {
    await this.redisService.delToken(userNo.toString() + "-refreshToken");
    await this.redisService.delToken(userNo.toString() + "-accessToken");
  }

  delRefreshToken(userNo: string) {
    return this.redisService.delToken(userNo);
  }

  delAccessToken(userNo: string) {
    return this.redisService.delToken(userNo);
  }
}
