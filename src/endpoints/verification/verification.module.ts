import { CacheModule, Module } from '@nestjs/common';
import { DateTimeModule } from '../../common';
import { TransactionLoggingModule } from '../../common/modules/transaction-logging/transaction-logging.module';
import { SubstrateModule } from '../../common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyriadAccount } from '@endpoints/myriad/models/myriad-account.entity';
import * as redisStore from 'cache-manager-redis-store';
import { keyList } from '@common/secrets';
import { MyriadModule } from '@endpoints/myriad/myriad.module';

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
    SubstrateModule,
    TransactionLoggingModule,
    DateTimeModule,
    TypeOrmModule.forFeature([MyriadAccount]),
    MyriadModule,
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
