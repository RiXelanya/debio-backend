import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { DebioConversionModule } from 'src/common';
import { keyList } from '../../common/secrets';
import { CacheController } from './conversion.controller';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [],
      useFactory: async (
      ) => {
        return {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          auth_pass: process.env.REDIS_PASSWORD,
          ttl: 2 * 60 * 60,
        };
      },
    }),
    HttpModule,
    DebioConversionModule,
  ],
  controllers: [CacheController],
})
export class ConversionModule {}
