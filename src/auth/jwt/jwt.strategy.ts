import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtDto } from "./jwt.dto";
import { Request } from "express";
import { TokenService } from "../services/token.service";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "accessToken") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtDto) {
    if (payload.sub !== "accessToken") {
      throw new BadRequestException("엑세스 토큰이 아닙니다.");
    }
    return { tokenType: payload.sub, no: payload.userNo };
  }
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  "refreshToken",
) {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtDto) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      console.log("authHeader");
      throw new BadRequestException("Authorization header is missing.");
    }

    if (payload.sub !== "refreshToken") {
      throw new BadRequestException("invalid token type");
    }

    const tokenFromRequest = authHeader.split(" ")[1];
    const tokenFromRedis = await this.tokenService.getRefreshToken(
      payload.userNo + "-refreshToken",
    );
    if (!tokenFromRedis) {
      throw new NotFoundException("Token not found.");
    }

    if (tokenFromRequest !== tokenFromRedis) {
      throw new NotFoundException("토큰이 일치하지 않습니다.");
    }

    return { tokenType: payload.sub, no: payload.userNo };
  }
}
