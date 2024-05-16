import { Injectable } from "@nestjs/common";
import axios from "axios";
import { UserRepository } from "src/users/users.repository";
import { TokenService } from "src/auth/token.service";
import { TokenRepository } from "src/auth/token.repository";

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
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
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
        throw new Error("소셜 토큰 발급 중 에러가 발생했습니다.");
      }
      const socialAccessToken = token.access_token;
      const socialRefreshToken = token.refresh_token;
      if (!socialAccessToken) {
        throw new Error("소셜 액세스 토큰이 없습니다.");
      }
      if (!socialRefreshToken) {
        throw new Error("소셜 리프레시 토큰이 없습니다.");
      }
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
        throw new Error("소셜 유저 정보를 가져오는 데 실패했습니다.");
      }
      console.log(userInfo);
      const userUniqueNumber = userInfo.response.id;
      const user =
        await this.userRepository.findUserByUniqueIndentifier(userUniqueNumber);
      console.log(user);
      if (!user) {
        console.log("유저 없음");
        await this.userRepository.createUser(
          userInfo.response.id,
          userInfo.response.name,
          userInfo.response.profile_image,
          "naver",
        );
      }
      const accessToken = await this.tokenService.createAccessToken(
        userUniqueNumber,
        user.no,
      );
      const refreshToken = await this.tokenService.createRefreshToken(
        userUniqueNumber,
        user.no,
      );
      await this.tokenRepository.saveTokens(
        userUniqueNumber,
        socialAccessToken,
        socialRefreshToken,
        refreshToken,
      );
      // await this.tokenService.setRefreshToken(userUniqueNumber, refreshToken); //redis에 리프레시 토큰 저장로직(아직 미완)

      return { accessToken, refreshToken };
    } catch (error) {
      // 에러 처리
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
        throw new Error("소셜 토큰 발급 중 에러가 발생했습니다.");
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
        throw new Error("소셜 유저 정보를 가져오는 데 실패했습니다.");
      }
      console.log(userInfo);
      const userUniqueNumber = userInfo.id.toString();
      const userProperties = userInfo.properties;
      console.log(userUniqueNumber);
      const user =
        await this.userRepository.findUserByUniqueIndentifier(userUniqueNumber);
      console.log(user);
      if (!user) {
        console.log("유저 없음");
        await this.userRepository.createUser(
          userUniqueNumber,
          userProperties.nickname,
          userProperties.profile_image,
          "kakao",
        );
      }
      const accessToken = await this.tokenService.createAccessToken(
        userUniqueNumber,
        user.no,
      );
      const refreshToken = await this.tokenService.createRefreshToken(
        userUniqueNumber,
        user.no,
      );
      await this.tokenRepository.saveTokens(
        userUniqueNumber,
        socialAccessToken,
        socialRefreshToken,
        refreshToken,
      );
      return { accessToken, refreshToken };
    } catch (error) {
      // 에러 처리
      console.log(error);
    }
  }
}