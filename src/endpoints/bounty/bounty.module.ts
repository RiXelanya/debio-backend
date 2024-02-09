import { Module } from '@nestjs/common';
import { BountyController } from './bounty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataStakingEvents } from './models/data-staking-events.entity';
import { DateTimeModule } from '../../common';
import { DataTokenToDatasetMapping } from './models/data-token-to-dataset-mapping.entity';
import { GCloudStorageModule } from '@debionetwork/nestjs-gcloud-storage';
import { keyList } from '../../common/secrets';

@Module({
  imports: [
    GCloudStorageModule.withConfigAsync({
      inject: [],
      useFactory: async (
      ) => ({
        defaultBucketname: process.env.BUCKET_NAME.toString(),
        storageBaseUri: process.env.STORAGE_BASE_URI.toString(),
        predefinedAcl: 'private',
      }),
    }),
    TypeOrmModule.forFeature([DataStakingEvents, DataTokenToDatasetMapping]),
    DateTimeModule,
  ],
  controllers: [BountyController],
})
export class BountyModule {}
