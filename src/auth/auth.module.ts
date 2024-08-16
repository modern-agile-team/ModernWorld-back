import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";
import { UsersModule } from "src/users/users.module";
import { TokenService } from "./services/token.service";
import { TokenRepository } from "./repositories/token.repository";
import { JwtModule } from "@nestjs/jwt";
import { AccessStrategy, RefreshStrategy } from "./jwt/jwt.strategy";
import { RedisModule } from "./redis/redis.module";
import { LegendsModule } from "src/legends/legends.module";
import { NaverAuthService } from "./services/naver-auth.service";
import { KakaoAuthService } from "./services/kakao-auth.service";
import { GoogleAuthService } from "./services/google-auth.service";

@Module({
  imports: [UsersModule, JwtModule, RedisModule, LegendsModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    NaverAuthService,
    KakaoAuthService,
    GoogleAuthService,
    TokenService,
    TokenRepository,
    AccessStrategy,
    RefreshStrategy,
  ],
})
export class AuthModule {}
