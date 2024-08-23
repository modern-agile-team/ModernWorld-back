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
import { ApiGoogleLogin } from "./swagger-decorators/google-login-decorator";
import { ApiUpdateProfile } from "./swagger-decorators/updateProfile-decorator";
import { NaverAuthService } from "./services/naver-auth.service";
import { KakaoAuthService } from "./services/kakao-auth.service";
import { GoogleAuthService } from "./services/google-auth.service";
import { ApiLogout } from "./swagger-decorators/logout-decorator";
import { ApiUnlink } from "./swagger-decorators/unlink-decorator";

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
    return this.naverAuthService.login(code);
  }

  @ApiKakaoLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("kakao/login")
  async kakaoLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다.");
    }
    return this.kakaoAuthService.login(code);
  }
  @ApiGoogleLogin()
  @UseInterceptors(CookieInterceptor)
  @Post("google/login")
  async googleLogin(@Query("code") code: string) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다");
    }
    return this.googleAuthService.login(code);
  }

  @ApiNewAccessToken()
  @UseGuards(RefreshTokenAuthGuard)
  @Get("new-access-token")
  async newAccessToken(@UserNo() userNo: number) {
    return await this.tokenService.createNewAccessToken(userNo);
  }

  @ApiLogout()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("logout")
  async logout(@UserNo() userNo: number) {
    return await this.authService.logout(userNo);
  }

  @ApiUnlink()
  @UseGuards(AccessTokenAuthGuard)
  @Delete("unlink")
  async unlink(@UserNo() userNo: number) {
    return await this.authService.unlink(userNo);
  }

  @ApiUpdateProfile()
  @UseGuards(AccessTokenAuthGuard)
  @Patch("updateProfile")
  async updateProfile(@UserNo() userNo: number) {
    return await this.authService.updateProfile(userNo);
  }
}
