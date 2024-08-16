import {
  ConflictException,
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

@Injectable()
export class GoogleAuthService {
  private tokenUrl: string;
  private grant_type: string;
  private client_id: string;
  private client_secret: string;
  private code: string;
  private redirect_uri: string;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly legendsRepository: LegendsRepository,
  ) {}

  async googleLogin(authorizeCode: string) {
    try {
      this.tokenUrl = "https://oauth2.googleapis.com/token";
      this.grant_type = "authorization_code";
      this.client_id = this.configService.get<string>("GOOGLE_CLIENT_ID");
      this.client_secret = this.configService.get<string>(
        "GOOGLE_CLIENT_SECRET",
      );
      this.redirect_uri = this.configService.get<string>(
        "GOOGLE_CLIENT_CALLBACK_URL",
      );
      this.code = authorizeCode;
      const tokenBody = {
        access_type: "offline",
        prompt: "consent",
        grant_type: this.grant_type,
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: this.code,
        redirect_uri: this.redirect_uri,
      };
      const tokenHeader = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const token = (await axios.post(this.tokenUrl, tokenBody, tokenHeader))
        .data;
      if (!token) {
        throw new UnauthorizedException("Invalid authorization code.");
      }

      const socialAccessToken = token.access_token;
      const socialRefreshToken = token.refresh_token;
      const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
      const userInfoHeader = {
        headers: {
          Authorization: `Bearer ${socialAccessToken}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      };

      const userInfo = (await axios.get(userInfoUrl, userInfoHeader)).data;

      if (!userInfo) {
        throw new InternalServerErrorException(
          "Failed to retrieve social user information.",
        );
      }
      const userUniqueIdentifier = userInfo.id;
      let user =
        await this.usersRepository.findUserByUniqueIndentifier(
          userUniqueIdentifier,
        );
      if (!user) {
        user = await this.usersRepository.createUser(
          userUniqueIdentifier,
          userInfo.name,
          userInfo.picture,
          "google",
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
      this.logger.error(error);
      if (error.response) {
        throw new UnauthorizedException("Invalid authorization code.");
      }
      throw new InternalServerErrorException(
        "로그인 중 서버에러가 발생했습니다.",
      );
    }
  }

  async googleLogout(userNo: number) {
    try {
      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (!user) {
        throw new NotFoundException("user not found");
      }
      if (user.domain !== "google") {
        throw new UnauthorizedException(
          "You are not a user logged in with Google.",
        );
      }

      await this.tokenRepository.deleteTokens(userNo);

      await this.tokenService.delRefreshToken(
        userNo.toString() + "-refreshToken",
      );
      await this.tokenService.delAccessToken(
        userNo.toString() + "-accessToken",
      );

      return { message: "구글 로그아웃 성공" };
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

  async googleUnlink(userNo: number) {
    try {
      const socialTokens = await this.tokenRepository.findToken(userNo);
      if (!socialTokens) {
        throw new NotFoundException("socialToken not found");
      }
      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (user.domain !== "google") {
        throw new UnauthorizedException(
          "You are not a user logged in with Google.",
        );
      }
      let socialAccessToken = socialTokens.socialAccess;
      const socialRefreshToken = socialTokens.socialRefresh;

      const socialAccessTokenInfo =
        await this.tokenService.googleSocialAccessTokenInfo(socialAccessToken);
      if (socialAccessTokenInfo === 401) {
        const newGoogleAccessToken =
          await this.tokenService.createNewGoogleAccessToken(
            socialRefreshToken,
          );
        await this.tokenRepository.updateAccessToken(
          userNo,
          newGoogleAccessToken.access_token,
        );
        socialAccessToken = newGoogleAccessToken.access_token;
      }

      await axios.post(
        `https://accounts.google.com/o/oauth2/revoke?token=${socialAccessToken}`,
        {},
        { headers: { "Content-type": "application/x-www-form-urlencoded" } },
      );

      await this.tokenRepository.deleteTokens(userNo);
      await this.tokenService.delRefreshToken(
        userNo.toString() + "-refreshToken",
      );
      await this.tokenService.delAccessToken(
        userNo.toString() + "-accessToken",
      );

      await this.usersRepository.updateDeletedAt(userNo, new Date());

      return { message: "구글 회원탈퇴 성공" };
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
