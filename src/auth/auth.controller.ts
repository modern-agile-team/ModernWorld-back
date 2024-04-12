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

  @Get("google/login")
  // @UseGuards(AuthGuard(""))
  googleLogin(@Query("code") code: string) {
    if (!code) {
      throw new Error("인가 코드가 없습니다.");
    }
    return this.authService.login(code, UserProvider.Google);
  }
}
