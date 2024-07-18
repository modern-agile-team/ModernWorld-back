import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from "./jwt/jwt.guard";
import { userNo } from "./auth.decorator";
import { Response, Request } from "express";
import { TokenService } from "./services/token.service";
import { ApiNaverLogin } from "./swagger-decorators/naver-login-decorator";
import { ApiKakaoLogin } from "./swagger-decorators/kakao-login-decorator";
import { ApiNewAccessToken } from "./swagger-decorators/new-access-token.decorator";
import { CookieInterceptor } from "./cookie.interceptor";

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
  @ApiNewAccessToken()
  @UseGuards(RefreshTokenAuthGuard)
  @Get("new-access-token")
  async newAccessToken(@userNo() userNo: number) {
    return await this.tokenService.createNewAccessToken(userNo);
  }

  // @UseGuards(AccessTokenAuthGuard)
  // @Post("kakao/logout")
  // async kakaoLogout(@userNo() userNo: number) {
  //   await this.authService.kakaoLogout(userNo);
  // }
}
