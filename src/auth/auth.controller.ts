import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { configDotenv } from "dotenv";
import { UserProvider } from "src/auth/user-provider.enum";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // @UseGuards(AuthGuard("google"))
  // async googleAuth(@Req() req) {}
  // @UseGuards(AuthGuard(""))
  @Get("google/login")
  googleLogin(@Query("code") code: string) {
    if (!code) {
      throw new Error("인가 코드가 없습니다.");
    }
    // return this.authService.googleLogin(code);
  }
  @Get("naver/login")
  naverLogin(@Query("code") code: string) {
    if (!code) {
      throw new Error("인가 코드가 없습니다.");
    }
    return this.authService.naverLogin(code);
  }
  @Get("kakao/login")
  kakaoLogin(@Query("code") code: string) {
    if (!code) {
      throw new Error("인가 코드가 없습니다.");
    }
    // return this.authService.kakaoLogin(code);
  }
}
