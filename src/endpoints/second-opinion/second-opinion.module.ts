import { keyList } from '@common/secrets';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthProfessionalRole } from './models/health-professional-role.entity';
import { HealthProfessionalSpecialization } from './models/health-professional-specialization.entity';
import { SecondOpinionController } from './second-opinion.controller';
import { SecondOpinionService } from './second-opinion.service';
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
    TypeOrmModule.forFeature([
      HealthProfessionalSpecialization,
      HealthProfessionalRole,
    ]),
  ],
  controllers: [SecondOpinionController],
  providers: [SecondOpinionService],
  exports: [TypeOrmModule],
})
export class SecondOpinionModule {}
