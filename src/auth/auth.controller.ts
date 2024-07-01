import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { AccessTokenAuthGuard } from "./jwt.guard";
import { userNo } from "./auth.decorator";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("naver/login")
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
  async naverLogin(@Query("code") code: string, @Res() res: Response) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다.");
    }
    const token = await this.authService.naverLogin(code);
    res.cookie("refreshToken", token.refreshToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    });
    return res.send(token);
  }

  @Post("kakao/login")
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
  async kakaoLogin(@Query("code") code: string, @Res() res: Response) {
    if (!code) {
      throw new BadRequestException("인가 코드가 없습니다.");
    }
    const token = await this.authService.kakaoLogin(code);
    res.cookie("refreshToken", token.refreshToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    });
    return res.send(token);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get("test")
  test(@userNo() userNo: number) {
    console.log("test");
    console.log(userNo);
  }
}
