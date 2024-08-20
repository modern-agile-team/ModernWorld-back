import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import { UsersRepository } from "src/users/users.repository";
import { TokenService } from "src/auth/services/token.service";
import { TokenRepository } from "src/auth/repositories/token.repository";
import { ConfigService } from "@nestjs/config";
import { LegendsRepository } from "src/legends/legends.repository";
import { BansService } from "src/bans/bans.service";

@Injectable()
export class KakaoAuthService {
  private tokenUrl: string;
  private grant_type: string;
  private client_id: string;
  private client_secret: string;
  private code: string;
  private userInfoUrl: string;
  private redirect_uri: string;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly legendsRepository: LegendsRepository,
    private readonly bansService: BansService,
  ) {}

  async login(authorizeCode: string) {
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
        await axios.post(
          this.userInfoUrl,
          { secure_resource: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${socialAccessToken}`,
            },
          },
        )
      ).data;

      if (!userInfo) {
        throw new InternalServerErrorException(
          "Failed to retrieve social user information",
        );
      }

      const userUniqueIdentifier = userInfo.id.toString();
      const userProperties = userInfo.properties;

      await this.bansService.checkBan(userUniqueIdentifier);

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
        await this.legendsRepository.createUserLegend(user.no);
      }

      await this.usersRepository.updateDeletedAt(user.no, null);

      const accessToken = this.tokenService.createAccessToken(user.no);
      const refreshToken = this.tokenService.createRefreshToken(user.no);

      const socialTokens = await this.tokenRepository.findToken(user.no);
      if (!socialTokens) {
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

      return {
        accessToken,
        refreshToken,
        nickname: user.nickname,
        userNo: user.no,
      };
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException(error.message);
      } else if (error.status === 403) {
        throw new ForbiddenException(error.message);
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException(
          "로그인 중 서버에러가 발생했습니다.",
        );
      }
    }
  }

  async logout(userNo: number) {
    try {
      const socialTokens = await this.tokenRepository.findToken(userNo);
      if (!socialTokens) {
        throw new NotFoundException("socialToken not found");
      }
      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (user.domain !== "kakao") {
        throw new UnauthorizedException(
          "You are not a user logged in with Kakao.",
        );
      }

      let socialAccessToken = socialTokens.socialAccess;
      const socialRefreshToken = socialTokens.socialRefresh;

      const socialAccessTokenInfo =
        await this.tokenService.kakaoSocialAccessTokenInfo(socialAccessToken);

      if (socialAccessTokenInfo === 401) {
        const newKakaoAccessToken =
          await this.tokenService.createNewkakaoAccessToken(socialRefreshToken);
        await this.tokenRepository.updateAccessToken(
          userNo,
          newKakaoAccessToken.access_token,
        );
        socialAccessToken = newKakaoAccessToken.access_token;
      }

      await axios.post(
        "https://kapi.kakao.com/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${socialAccessToken}`,
          },
        },
      );

      await this.tokenRepository.deleteTokens(userNo);
      await this.tokenService.delRefreshToken(
        userNo.toString() + "-refreshToken",
      );
      await this.tokenService.delAccessToken(
        userNo.toString() + "-accessToken",
      );
    } catch (error) {
      if (error.response.statusCode === 401) {
        throw new UnauthorizedException(error.response.message);
      } else if (error.response.statusCode === 404) {
        throw new NotFoundException(error.response.message);
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException(
          "로그아웃 중 서버에러가 발생했습니다.",
        );
      }
    }
    return { message: "카카오 로그아웃 성공" };
  }

  async unlink(userNo: number) {
    try {
      const socialTokens = await this.tokenRepository.findToken(userNo);
      if (!socialTokens) {
        throw new NotFoundException("socialToken not found");
      }
      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (user.domain !== "kakao") {
        throw new UnauthorizedException(
          "You are not a user logged in with Kakao.",
        );
      }
      let socialAccessToken = socialTokens.socialAccess;
      const socialRefreshToken = socialTokens.socialRefresh;

      const socialAccessTokenInfo =
        await this.tokenService.kakaoSocialAccessTokenInfo(socialAccessToken);

      if (socialAccessTokenInfo === 401) {
        const newKakaoAccessToken =
          await this.tokenService.createNewkakaoAccessToken(socialRefreshToken);
        await this.tokenRepository.updateAccessToken(
          userNo,
          newKakaoAccessToken.access_token,
        );
        socialAccessToken = newKakaoAccessToken.access_token;
      }
      const unlink = (
        await axios.post(
          "https://kapi.kakao.com/v1/user/unlink",
          {},
          { headers: { Authorization: `Bearer ${socialAccessToken}` } },
        )
      ).data;

      if (unlink.id !== +user.uniqueIdentifier) {
        throw new ConflictException("Invalid user");
      }

      await this.tokenRepository.deleteTokens(userNo);
      await this.tokenService.delRefreshToken(
        userNo.toString() + "-refreshToken",
      );
      await this.tokenService.delAccessToken(
        userNo.toString() + "-accessToken",
      );

      await this.usersRepository.updateDeletedAt(userNo, new Date());

      return { message: "카카오 탈퇴 성공" };
    } catch (error) {
      if (error.response.statusCode === 401) {
        throw new UnauthorizedException(error.response.message);
      } else if (error.response.statusCode === 404) {
        throw new NotFoundException(error.response.message);
      } else if (error.response.statusCode === 409) {
        throw new ConflictException(error.response.message);
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException(
          "회원탈퇴 중 서버에러가 발생했습니다.",
        );
      }
    }
  }
}
