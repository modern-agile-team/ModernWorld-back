import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from "./jwt/jwt.guard";
import { UserNo } from "./auth.decorator";
import { TokenService } from "./services/token.service";
import { ApiNaverLogin } from "./swagger-decorators/naver-login-decorator";
import { ApiKakaoLogin } from "./swagger-decorators/kakao-login-decorator";
import { ApiNewAccessToken } from "./swagger-decorators/new-access-token.decorator";
import { CookieInterceptor } from "./interceptors/cookie.interceptor";
import { ApiKakaoLogout } from "./swagger-decorators/kakao-logout-decorator";
import { ApiNaverLogout } from "./swagger-decorators/naver-logout-decorator";
import { ApiKakaoUnlink } from "./swagger-decorators/kakao-unlink-decorator";
import { ApiNaverUnlink } from "./swagger-decorators/naver-unlink-decorator";
import { ApiGoogleLogin } from "./swagger-decorators/google-login-decorator";
import { ApiGoogleLogout } from "./swagger-decorators/google-logout-decorator";
import { ApiGoogleUnlink } from "./swagger-decorators/google-unlink-decorator";
import { ApiUpdateProfile } from "./swagger-decorators/updateProfile-decorator";
import { NaverAuthService } from "./services/naver-auth.service";
import { KakaoAuthService } from "./services/kakao-auth.service";
import { GoogleAuthService } from "./services/google-auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly naverAuthService: NaverAuthService,
    private readonly kakaoAuthService: KakaoAuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiNaverLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("naver/login")
  async naverLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다.");
    }
    return this.naverAuthService.naverLogin(code);
  }

  @ApiKakaoLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("kakao/login")
  async kakaoLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다.");
    }
    return this.kakaoAuthService.kakaoLogin(code);
  }
  @ApiGoogleLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("google/login")
  async googleLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다");
    }
    return this.googleAuthService.googleLogin(code);
  }

  @ApiNewAccessToken()
  @UseGuards(RefreshTokenAuthGuard)
  @Get("new-access-token")
  async newAccessToken(@UserNo() userNo: number) {
    return await this.tokenService.createNewAccessToken(userNo);
  }

  @ApiKakaoLogout()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("kakao/logout")
  async kakaoLogout(@UserNo() userNo: number) {
    return await this.kakaoAuthService.kakaoLogout(userNo);
  }

  @ApiNaverLogout()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("naver/logout")
  async naverLogout(@UserNo() userNo: number) {
    return await this.naverAuthService.naverLogout(userNo);
  }

  @ApiGoogleLogout()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("google/logout")
  async googleLogout(@UserNo() userNo: number) {
    return await this.googleAuthService.googleLogout(userNo);
  }

  @ApiKakaoUnlink()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("kakao/unlink")
  async kakaoUnlink(@UserNo() userNo: number) {
    return await this.kakaoAuthService.kakaoUnlink(userNo);
  }

  @ApiNaverUnlink()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("naver/unlink")
  async naverUnlink(@UserNo() userNo: number) {
    return await this.naverAuthService.naverUnlink(userNo);
  }

  @ApiGoogleUnlink()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("google/unlink")
  async googleUnlink(@UserNo() userNo: number) {
    return await this.googleAuthService.googleUnlink(userNo);
  }

  @ApiUpdateProfile()
  @UseGuards(AccessTokenAuthGuard)
  @Patch("updateProfile")
  async updateProfile(@UserNo() userNo: number) {
    return await this.authService.updateProfile(userNo);
  }
}
