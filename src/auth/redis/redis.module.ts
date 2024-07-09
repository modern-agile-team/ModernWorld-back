import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
// import * as redisStore from "cache-manager-redis-store";
import * as dotenv from "dotenv";
import { RedisService } from "./redis.service";
import * as redisStore from "cache-manager-ioredis";

dotenv.config();

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],

  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
