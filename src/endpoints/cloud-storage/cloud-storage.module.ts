import { Module } from '@nestjs/common';
import { GCloudStorageModule } from '@debionetwork/nestjs-gcloud-storage';
import { CloudStorageController } from './cloud-storage.controller';
import { DateTimeModule } from '../../common';
import { keyList } from '../../common/secrets';

@Module({
  imports: [
    GCloudStorageModule.withConfigAsync({
      inject: [],
      useFactory: async (
      ) => {
        return {
          defaultBucketname: process.env.BUCKET_NAME.toString(),
          storageBaseUri: process.env.STORAGE_BASE_URI.toString(),
          predefinedAcl: 'private',
        };
      },
    }),
    DateTimeModule,
  ],
  controllers: [CloudStorageController],
})
export class CloudStorageModule {}
