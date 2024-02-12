import { DebioConversionService } from './debio-conversion.service';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (
      ) => {
        return {
          store: redisStore,
          host: process.env.HOST_REDIS.toString(),
          port: process.env.PORT_REDIS.toString(),
          auth_pass: process.env.REDIS_PASSWORD.toString(),
          ttl: 2 * 60 * 60,
        };
      },
    }),
  ],
  providers: [DebioConversionService],
  exports: [DebioConversionService],
})
export class DebioConversionModule {}
