import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from "./jwt/jwt.guard";
import { userNo } from "./auth.decorator";
import { Response } from "express";
import { TokenService } from "./services/token.service";
import { user } from "prisma/seeding/user";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}
  @UseGuards(AccessTokenAuthGuard)
  @Get("test")
  @ApiBearerAuth("access-token")
  async test(@userNo() userNo: number) {
    return userNo;
  }

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
      domain: "localhost", // 추후 프론트 서버 주소로 변경
      path: "/",
      httpOnly: true,
      secure: false, // https 설정을 확인하지 않기 위해서 선언
    });
    return res.send(token);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get("new-access-token")
  @ApiOperation({ summary: "액세스 토큰 재발급" })
  @ApiBearerAuth("refresh-token")
  @ApiResponse({
    status: 200,
    description: "액세스 토큰 재발급 성공",
    content: {
      JSON: {
        example: { accessToken: "액세스 토큰" },
      },
    },
  })
  async newAccessToken(@userNo() userNo: number) {
    return await this.tokenService.createNewAccessToken(userNo);
  }
}
