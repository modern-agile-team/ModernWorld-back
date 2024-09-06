import { Injectable, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly tokenCache: Cache) {}

  getToken(key: string): Promise<string | undefined | null> {
    return this.tokenCache.get(key);
  }

  setToken(key: string, token: string, ttl?: number) {
    return this.tokenCache.set(key, token, { ttl } as any);
  }

  delToken(key: string) {
    return this.tokenCache.del(key);
  }
}
