import { keyList } from '@common/secrets';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyriadAccount } from './models/myriad-account.entity';
import { MyriadController } from './myriad.controller';
import { MyriadService } from './myriad.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [],
      useFactory: async (
      ) => {
        return {
          store: redisStore,
          host: process.env.HOST_REDIS,
          port: process.env.PORT_REDIS,
          auth_pass: process.env.REDIS_PASSWORD,
          ttl: 2 * 60 * 60,
        };
      },
    }),
    TypeOrmModule.forFeature([MyriadAccount]),
  ],
  controllers: [MyriadController],
  providers: [MyriadService],
  exports: [TypeOrmModule, MyriadService],
})
export class MyriadModule {}
