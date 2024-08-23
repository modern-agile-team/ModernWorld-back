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
import { NaverAuthService } from "./naver-auth.service";
import { KakaoAuthService } from "./kakao-auth.service";
import { GoogleAuthService } from "./google-auth.service";

@Injectable()
export class AuthService {
  private userInfoUrl: string;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
    private readonly logger: Logger,
    private readonly naverAuthService: NaverAuthService,
    private readonly kakaoAuthService: KakaoAuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}
  async logout(userNo: number) {
    try {
      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (!user) {
        throw new NotFoundException("user not found");
      }
      if (user.domain === "naver") {
        return this.naverAuthService.logout(userNo);
      } else if (user.domain === "kakao") {
        return this.kakaoAuthService.logout(userNo);
      } else {
        return this.googleAuthService.logout(userNo);
      }
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
          "로그아웃 중 서버에러가 발생했습니다.",
        );
      }
    }
  }

  async unlink(userNo: number) {
    try {
      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (!user) {
        throw new NotFoundException("user not found");
      }
      if (user.domain === "naver") {
        return this.naverAuthService.unlink(userNo);
      } else if (user.domain === "kakao") {
        return this.kakaoAuthService.unlink(userNo);
      } else {
        return this.googleAuthService.unlink(userNo);
      }
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
          "탈퇴 중 서버에러가 발생했습니다.",
        );
      }
    }
  }

  async updateProfile(userNo: number) {
    try {
      const user = await this.usersRepository.findUserByUserNo(userNo);
      if (!user) {
        throw new NotFoundException("user not found");
      }
      if (user.domain === "naver") {
        const socialTokens = await this.tokenRepository.findToken(userNo);
        if (!socialTokens) {
          throw new NotFoundException("socialToken not found");
        }

        let socialAccessToken = socialTokens.socialAccess;
        const socialRefreshToken = socialTokens.socialRefresh;

        const socialAccessTokenInfo =
          await this.tokenService.naverSocialAccessTokenInfo(socialAccessToken);

        if (socialAccessTokenInfo === 401) {
          const newNaverAccessToken =
            await this.tokenService.createNewNaverAccessToken(
              socialRefreshToken,
            );
          await this.tokenRepository.updateAccessToken(
            userNo,
            newNaverAccessToken.access_token,
          );
          socialAccessToken = newNaverAccessToken.access_token;
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
          throw new InternalServerErrorException(
            "Failed to retrieve social user information.",
          );
        }

        await this.usersRepository.updateUser(
          userNo,
          userInfo.response.name,
          userInfo.response.profile_image,
        );
      } else if (user.domain === "kakao") {
        const socialTokens = await this.tokenRepository.findToken(userNo);
        if (!socialTokens) {
          throw new NotFoundException("socialToken not found");
        }
        let socialAccessToken = socialTokens.socialAccess;
        const socialRefreshToken = socialTokens.socialRefresh;

        const socialAccessTokenInfo =
          await this.tokenService.kakaoSocialAccessTokenInfo(socialAccessToken);

        if (socialAccessTokenInfo === 401) {
          const newKakaoAccessToken =
            await this.tokenService.createNewkakaoAccessToken(
              socialRefreshToken,
            );
          await this.tokenRepository.updateAccessToken(
            userNo,
            newKakaoAccessToken.access_token,
          );
          socialAccessToken = newKakaoAccessToken.access_token;
        }

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
            "Failed to retrieve social user information.",
          );
        }
        const userProperties = userInfo.properties;
        await this.usersRepository.updateUser(
          userNo,
          userProperties.nickname,
          userProperties.profile_image,
        );
      } else {
        const socialTokens = await this.tokenRepository.findToken(userNo);
        if (!socialTokens) {
          throw new NotFoundException("socialToken not found");
        }
        let socialAccessToken = socialTokens.socialAccess;
        const socialRefreshToken = socialTokens.socialRefresh;

        const socialAccessTokenInfo =
          await this.tokenService.googleSocialAccessTokenInfo(
            socialAccessToken,
          );

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

        await this.usersRepository.updateUser(
          userNo,
          userInfo.name,
          userInfo.picture,
        );
      }
      const updateUserInfo =
        await this.usersRepository.findUserByUserNo(userNo);
      return {
        message: "프로필 업데이트 성공",
        userProfileImage: updateUserInfo.image,
      };
    } catch (error) {
      if (error.response.message === "user not found") {
        throw new NotFoundException(error.response.message);
      }
      if (error.message === "socialToken not found") {
        throw new NotFoundException(error.response.message);
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException(
          "프로필 업데이트 중 서버에러가 발생했습니다.",
        );
      }
    }
  }
}
