import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import axios from "axios";
import { UsersRepository } from "src/users/users.repository";
import { TokenService } from "src/auth/services/token.service";
import { TokenRepository } from "src/auth/repositotys/token.repository";

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
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
    private readonly logger: Logger,
  ) {}
  async naverLogin(authorizeCode: string) {
    try {
      this.tokenUrl = "https://nid.naver.com/oauth2.0/token";
      this.grant_type = "authorization_code";
      this.client_id = process.env.NAVER_CLIENT_ID;
      this.client_secret = process.env.NAVER_CLIENT_SECRET;
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
        throw new InternalServerErrorException(
          "소셜 토큰 발급 중 에러가 발생했습니다.",
        );
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
          "소셜 유저 정보를 가져오는 데 실패했습니다.",
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
      }
      const accessToken = this.tokenService.createAccessToken(user.no);
      const refreshToken = this.tokenService.createRefreshToken(user.no);

      await this.tokenRepository.saveTokens(
        user.no,
        socialAccessToken,
        socialRefreshToken,
      ); // 이러면 매번 소셜 토큰들이 저장되어 추후 수정예정

      await this.tokenService.setRefreshToken(
        user.no.toString() + "-refreshToken",
        refreshToken,
        60 * 60 * 24 * 7, // 7일
      );
      await this.tokenService.setAccessToken(
        user.no.toString() + "-accessToken",
        accessToken,
        60 * 60 * 3, // 3시간
      );

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        "로그인 중 서버에러가 발생했습니다.",
      );
    }
  }
  async kakaoLogin(authorizeCode: string) {
    try {
      this.tokenUrl = "https://kauth.kakao.com/oauth/token";
      this.grant_type = "authorization_code";
      this.client_id = process.env.KAKAO_CLIENT_ID;
      this.client_secret = process.env.KAKAO_CLIENT_SECRET;
      this.redirect_uri = process.env.KAKAO_CLIENT_CALLBACK_URL;
      this.code = authorizeCode;
      const token = (
        await axios.post(
          this.tokenUrl,
          {
            grant_type: this.grant_type,
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: this.code,
            state: this.state,
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
        throw new InternalServerErrorException(
          "소셜 토큰 발급 중 에러가 발생했습니다.",
        );
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
          "소셜 유저 정보를 가져오는 데 실패했습니다.",
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
      }
      const accessToken = this.tokenService.createAccessToken(user.no);
      const refreshToken = this.tokenService.createRefreshToken(user.no);
      await this.tokenRepository.saveTokens(
        user.no,
        socialAccessToken,
        socialRefreshToken,
      );

      await this.tokenService.setRefreshToken(
        user.no.toString() + "-refreshToken",
        refreshToken,
        60 * 60 * 24 * 7, // 7일
      );
      await this.tokenService.setAccessToken(
        user.no.toString() + "-accessToken",
        accessToken,
        60 * 60 * 3, // 3시간
      );

      return { accessToken, refreshToken };
    } catch (error) {
      // 에러 처리
      this.logger.error(error);
      throw new InternalServerErrorException(
        "로그인 중 서버에러가 발생했습니다.",
      );
    }
  }
}