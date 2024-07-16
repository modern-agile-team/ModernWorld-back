import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";
import { UsersModule } from "src/users/users.module";
import { TokenService } from "./services/token.service";
import { TokenRepository } from "./repositories/token.repository";
import { JwtModule } from "@nestjs/jwt";
import { AccessStrategy, RefreshStrategy } from "./jwt/jwt.strategy";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [UsersModule, JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    TokenRepository,
    AccessStrategy,
    RefreshStrategy,
  ],
})
export class AuthModule {}
