import { CacheModule, Module } from '@nestjs/common';
import { CachesService } from './caches.service';
import * as redisStore from 'cache-manager-redis-store';

require('dotenv').config(); // eslint-disable-line

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
        };
      },
    }),
  ],
  providers: [CachesService],
  exports: [CachesService],
})
export class CachesModule {}

export * from './caches.service';
