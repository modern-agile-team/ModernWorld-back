import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { use } from "passport";
import { AccessTokenAuthGuard } from "./jwt.guard";
import { userNo } from "./auth.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // @UseGuards(AuthGuard("google"))
  // async googleAuth(@Req() req) {}
  // @UseGuards(AuthGuard(""))
  // @Get("google/login")
  // googleLogin(@Query("code") code: string) {
  //   if (!code) {
  //     throw new Error("인가 코드가 없습니다.");
  //   }
  //   // return this.authService.googleLogin(code);
  // }
  @Get("naver/login")
  @ApiOperation({ summary: "네이버 로그인" })
  @ApiQuery({ name: "code", description: "인가 코드", required: true })
  @ApiResponse({
    status: 200,
    description: "네이버 로그인 성공",
    content: {
      JSON: {
        example: { accessToken: "액세스 토큰", refreshToken: "리프레쉬 토큰" },
      },
    },
  })
  // @UseGuards(AccessTokenAuthGuard) //가드 사용 예제
  naverLogin(@Query("code") code: string) {
    if (!code) {
      throw new NotFoundException("인가 코드가 없습니다.");
    }
    return this.authService.naverLogin(code);
  }
  @Get("kakao/login")
  @ApiOperation({ summary: "카카오 로그인" })
  @ApiQuery({ name: "code", description: "인가 코드", required: true })
  @ApiResponse({
    status: 200,
    description: "카카오 로그인 성공",
    content: {
      JSON: {
        example: { accessToken: "액세스 토큰", refreshToken: "리프레쉬 토큰" },
      },
    },
  })
  kakaoLogin(@Query("code") code: string) {
    if (!code) {
      throw new NotFoundException("인가 코드가 없습니다.");
    }
    return this.authService.kakaoLogin(code);
  }
  @UseGuards(AccessTokenAuthGuard)
  @Get("test")
  test(@userNo() userNo: number) {
    console.log("test");
    console.log(userNo);
  }
}
