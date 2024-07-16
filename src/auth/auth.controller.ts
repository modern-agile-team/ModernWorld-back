import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from "./jwt/jwt.guard";
import { userNo } from "./auth.decorator";
import { Response, Request } from "express";
import { TokenService } from "./services/token.service";
import { ApiNaverLogin } from "./swagger-decorators/naver-login-decorator";
import { ApiKakaoLogin } from "./swagger-decorators/kakao-login-decorator";
import { ApiNewAccessToken } from "./swagger-decorators/new-access-token-decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiNaverLogin()
  @Post("naver/login")
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

  @ApiKakaoLogin()
  @Post("kakao/login")
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
  @ApiNewAccessToken()
  @UseGuards(RefreshTokenAuthGuard)
  @Get("new-access-token")
  async newAccessToken(@userNo() userNo: number) {
    return await this.tokenService.createNewAccessToken(userNo);
  }
}
