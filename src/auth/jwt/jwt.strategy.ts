import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtDto } from "./jwt.dto";
import { Request } from "express";
import { TokenService } from "../services/token.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "accessToken") {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtDto) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new BadRequestException("Authorization header is missing.");
    }

    if (payload.sub !== "accessToken") {
      throw new BadRequestException("not access token type");
    }

    const tokenFromRequest = authHeader.split(" ")[1];
    const tokenFromRedis = await this.tokenService.getAccessToken(
      payload.userNo + "-accessToken",
    );
    if (!tokenFromRedis) {
      throw new NotFoundException("Token not found.");
    }

    if (tokenFromRequest !== tokenFromRedis) {
      throw new ConflictException("token is not matched.");
    }
    return { tokenType: payload.sub, no: payload.userNo };
  }
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  "refreshToken",
) {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtDto) {
    const tokenFromRequest = request.cookies.refreshToken;
    if (!tokenFromRequest) {
      throw new BadRequestException("Cookie has no refresh token");
    }

    if (payload.sub !== "refreshToken") {
      throw new BadRequestException("not refresh token type");
    }

    const tokenFromRedis = await this.tokenService.getRefreshToken(
      payload.userNo + "-refreshToken",
    );
    if (!tokenFromRedis) {
      throw new NotFoundException("Token not found.");
    }

    if (tokenFromRequest !== tokenFromRedis) {
      throw new ConflictException("token is not matched.");
    }

    return { tokenType: payload.sub, no: payload.userNo };
  }
}
