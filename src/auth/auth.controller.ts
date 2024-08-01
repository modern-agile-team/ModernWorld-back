import {
  BadRequestException,
  Controller,
  Delete,
  Get,
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
import { AuthGuard } from "@nestjs/passport";
import { ApiGoogleLogin } from "./swagger-decorators/google-login-decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiNaverLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("naver/login")
  async naverLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다.");
    }
    return this.authService.naverLogin(code);
  }

  @ApiKakaoLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("kakao/login")
  async kakaoLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다.");
    }
    return this.authService.kakaoLogin(code);
  }
  @ApiGoogleLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("google/login")
  async googleLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다");
    }
    return this.authService.googleLogin(code);
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
    return await this.authService.kakaoLogout(userNo);
  }

  @ApiNaverLogout()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("naver/logout")
  async naverLogout(@UserNo() userNo: number) {
    return await this.authService.naverLogout(userNo);
  }

  @ApiKakaoUnlink()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("kakao/unlink")
  async kakaoUnlink(@UserNo() userNo: number) {
    return await this.authService.kakaoUnlink(userNo);
  }

  @ApiNaverUnlink()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("naver/unlink")
  async naverUnlink(@UserNo() userNo: number) {
    return await this.authService.naverUnlink(userNo);
  }
}
