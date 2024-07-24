import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import { UsersRepository } from "src/users/users.repository";
import { TokenService } from "src/auth/services/token.service";
import { TokenRepository } from "src/auth/repositories/token.repository";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  private tokenUrl: string;
  private grant_type: string;
  private client_id: string;
  private client_secret: string;
  private code: string;
  private state: string;
  private userInfoUrl: string;
  private redirect_uri: string;
  private newUser: boolean;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  async naverLogin(authorizeCode: string) {
    try {
      this.tokenUrl = "https://nid.naver.com/oauth2.0/token";
      this.grant_type = "authorization_code";
      this.client_id = this.configService.get<string>("NAVER_CLIENT_ID");
      this.client_secret = this.configService.get<string>(
        "NAVER_CLIENT_SECRET",
      );
      this.code = authorizeCode;
      this.state = "test";
      this.newUser = false;

      const token = (
        await axios.post(
          this.tokenUrl,
          {
            grant_type: this.grant_type,
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: this.code,
            state: this.state,
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
        )
      ).data;

      if (!token) {
        throw new UnauthorizedException("Invalid authorization code.");
      }

      const socialAccessToken = token.access_token;
      const socialRefreshToken = token.refresh_token;

      this.userInfoUrl = "https://openapi.naver.com/v1/nid/me";
      const userInfo = (
        await axios.get(this.userInfoUrl, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${socialAccessToken}`,
          },
        })
      ).data;

      if (!userInfo) {
        throw new InternalServerErrorException(
          "Failed to retrieve social user information.",
        );
      }

      const userUniqueIdentifier = userInfo.response.id;
      let user =
        await this.usersRepository.findUserByUniqueIndentifier(
          userUniqueIdentifier,
        );

      if (!user) {
        user = await this.usersRepository.createUser(
          userUniqueIdentifier,
          userInfo.response.name,
          userInfo.response.profile_image,
          "naver",
        );
        this.newUser = true;
      }

      const accessToken = this.tokenService.createAccessToken(user.no);
      const refreshToken = this.tokenService.createRefreshToken(user.no);

      const socialTokens = await this.tokenRepository.findToken(user.no);
      if (socialTokens[0] === undefined) {
        await this.tokenRepository.saveTokens(
          user.no,
          socialAccessToken,
          socialRefreshToken,
        );
      } else {
        await this.tokenRepository.updateTokens(
          user.no,
          socialAccessToken,
          socialRefreshToken,
        );
      }

      await this.tokenService.setRefreshToken(
        user.no.toString() + "-refreshToken",
        refreshToken,
        60 * 60 * 24 * 7, // 7일
      );
      await this.tokenService.setAccessToken(
        user.no.toString() + "-accessToken",
        accessToken,
        60 * 60 * 12, // 12시간
      );

      return { accessToken, refreshToken, newUser: this.newUser };
    } catch (error) {
      this.logger.error(error);
      if (error.response) {
        throw new UnauthorizedException("Invalid authorization code.");
      }
      throw new InternalServerErrorException(
        "로그인 중 서버에러가 발생했습니다.",
      );
    }
  }

  async kakaoLogin(authorizeCode: string) {
    try {
      this.tokenUrl = "https://kauth.kakao.com/oauth/token";
      this.grant_type = "authorization_code";
      this.client_id = this.configService.get<string>("KAKAO_CLIENT_ID");
      this.client_secret = this.configService.get<string>(
        "KAKAO_CLIENT_SECRET",
      );
      this.redirect_uri = this.configService.get<string>(
        "KAKAO_CLIENT_CALLBACK_URL",
      );
      this.code = authorizeCode;
      this.newUser = false;

      const token = (
        await axios.post(
          this.tokenUrl,
          {
            grant_type: this.grant_type,
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: this.code,
            redirect_uri: this.redirect_uri,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          },
        )
      ).data;

      if (!token) {
        throw new UnauthorizedException("Invalid authorization code.");
      }

      const socialAccessToken = token.access_token;
      const socialRefreshToken = token.refresh_token;

      this.userInfoUrl = "https://kapi.kakao.com/v2/user/me";
      const userInfo = (
        await axios.get(this.userInfoUrl, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${socialAccessToken}`,
          },
        })
      ).data;

      if (!userInfo) {
        throw new InternalServerErrorException(
          "Failed to retrieve social user information",
        );
      }

      const userUniqueIdentifier = userInfo.id.toString();
      const userProperties = userInfo.properties;

      let user =
        await this.usersRepository.findUserByUniqueIndentifier(
          userUniqueIdentifier,
        );

      if (!user) {
        user = await this.usersRepository.createUser(
          userUniqueIdentifier,
          userProperties.nickname,
          userProperties.profile_image,
          "kakao",
        );
        this.newUser = true;
      }
      if (user.nickname === null) {
        this.newUser = true;
      }
      const accessToken = this.tokenService.createAccessToken(user.no);
      const refreshToken = this.tokenService.createRefreshToken(user.no);

      const socialTokens = await this.tokenRepository.findToken(user.no);
      if (socialTokens[0] === undefined) {
        await this.tokenRepository.saveTokens(
          user.no,
          socialAccessToken,
          socialRefreshToken,
        );
      } else {
        await this.tokenRepository.updateTokens(
          user.no,
          socialAccessToken,
          socialRefreshToken,
        );
      }

      await this.tokenService.setRefreshToken(
        user.no.toString() + "-refreshToken",
        refreshToken,
        60 * 60 * 24 * 7, // 7일
      );
      await this.tokenService.setAccessToken(
        user.no.toString() + "-accessToken",
        accessToken,
        60 * 60 * 12, // 12시간
      );

      return { accessToken, refreshToken, newUser: this.newUser };
    } catch (error) {
      this.logger.error(error);
      if (error.response) {
        throw new UnauthorizedException("Invalid authorization code.");
      }
      throw new InternalServerErrorException(
        "로그인 중 서버에러가 발생했습니다.",
      );
    }
  }
  // async kakaoLogout(userNo: number) {
  //   try {
  //     const socialTokens = await this.tokenRepository.findToken(userNo);
  //     if (socialTokens[0] === undefined) {
  //       throw new UnauthorizedException("로그아웃할 유저가 없습니다.");
  //     }

  //     const socialAccessToken = socialTokens[0].socialAccess;
  //     const socialRefreshToken = socialTokens[0].socialRefresh;

  //     const socialAccessTokenUserInfo = (
  //       await axios.get("https://kapi.kakao.com/v1/user/access_token_info", {
  //         headers: {
  //           Authorization: `Bearer ${socialAccessToken}`,
  //         },
  //       })
  //     ).data;
  //     if(socialAccessTokenUserInfo.status === 401) {

  //     }

  //     await axios.post(
  //       "https://kapi.kakao.com/v1/user/logout",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${socialAccessToken}`,
  //         },
  //       },
  //     );

  //     await this.tokenRepository.deleteTokens(userNo);
  //     await this.tokenService.deleteRefreshToken(
  //       userNo.toString() + "-refreshToken",
  //     );
  //     await this.tokenService.deleteAccessToken(
  //       userNo.toString() + "-accessToken",
  //     );
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw new InternalServerErrorException(
  //       "로그아웃 중 서버에러가 발생했습니다.",
  //     );
  //   }
  // }
}
