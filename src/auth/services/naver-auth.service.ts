import {
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
export class NaverAuthService {
  private tokenUrl: string;
  private grant_type: string;
  private client_id: string;
  private client_secret: string;
  private code: string;
  private state: string;
  private userInfoUrl: string;

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
      this.tokenUrl = "https://nid.naver.com/oauth2.0/token";
      this.grant_type = "authorization_code";
      this.client_id = this.configService.get<string>("NAVER_CLIENT_ID");
      this.client_secret = this.configService.get<string>(
        "NAVER_CLIENT_SECRET",
      );
      this.code = authorizeCode;
      this.state = "test";

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
      await this.bansService.checkBan(userUniqueIdentifier);

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
        this.configService.get<number>("REDIS_REFRESH_TOKEN_EXPIRATION"),
      );
      await this.tokenService.setAccessToken(
        user.no.toString() + "-accessToken",
        accessToken,
        this.configService.get<number>("REDIS_ACCESS_TOKEN_EXPIRATION"),
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
      await this.tokenRepository.deleteTokens(userNo);

      await this.tokenService.delRefreshToken(
        userNo.toString() + "-refreshToken",
      );
      await this.tokenService.delAccessToken(
        userNo.toString() + "-accessToken",
      );

      return { message: "네이버 로그아웃 성공" };
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
  }

  async unlink(userNo: number) {
    try {
      const socialTokens = await this.tokenRepository.findToken(userNo);
      if (!socialTokens) {
        throw new NotFoundException("socialToken not found");
      }

      let socialAccessToken = socialTokens.socialAccess;
      const socialRefreshToken = socialTokens.socialRefresh;

      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (!user) {
        throw new NotFoundException("user not found");
      }
      if (user.domain !== "naver") {
        throw new UnauthorizedException(
          "You are not a user logged in with Naver.",
        );
      }
      const socialAccessTokenInfo =
        await this.tokenService.naverSocialAccessTokenInfo(socialAccessToken);

      if (socialAccessTokenInfo === 401) {
        const newNaverAccessToken =
          await this.tokenService.createNewNaverAccessToken(socialRefreshToken);
        await this.tokenRepository.updateAccessToken(
          userNo,
          newNaverAccessToken.access_token,
        );
        socialAccessToken = newNaverAccessToken.access_token;
      }
      const naverUnlinkUrl = "https://nid.naver.com/oauth2.0/token";
      const naverUnlinkData = {
        grant_type: "delete",
        client_id: this.configService.get<string>("NAVER_CLIENT_ID"),
        client_secret: this.configService.get<string>("NAVER_CLIENT_SECRET"),
        access_token: socialAccessToken,
      };
      const userUnlink = (
        await axios.get(naverUnlinkUrl, {
          params: naverUnlinkData,
        })
      ).data;

      if (userUnlink.result !== "success") {
        throw new UnauthorizedException(userUnlink.error_description);
      }

      await this.tokenRepository.deleteTokens(userNo);
      await this.tokenService.delRefreshToken(
        userNo.toString() + "-refreshToken",
      );
      await this.tokenService.delAccessToken(
        userNo.toString() + "-accessToken",
      );

      await this.usersRepository.updateDeletedAt(userNo, new Date());

      return { message: "네이버 회원 탈퇴 성공" };
    } catch (error) {
      if (error.response.statusCode === 401) {
        throw new UnauthorizedException(error.response.message);
      } else if (error.response.statusCode === 404) {
        throw new NotFoundException(error.response.message);
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException(
          "회원탈퇴 중 서버에러가 발생했습니다.",
        );
      }
    }
  }
}
