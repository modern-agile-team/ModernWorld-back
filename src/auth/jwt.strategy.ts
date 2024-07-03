import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtDto } from "./jwt.dto";

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
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtDto) {
    if (payload.sub !== "refreshToken") {
      throw new BadRequestException("리프레시 토큰이 아닙니다.");
    }
    return { tokenType: payload.sub, no: payload.userNo };
  }
}
