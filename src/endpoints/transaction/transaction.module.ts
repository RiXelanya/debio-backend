import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { keyList } from '../../common/secrets';
import { TransactionLoggingModule } from '../../common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TransactionLoggingModule,
    ElasticsearchModule.registerAsync({
      inject: [],
      useFactory: async (
      ) => {
        return {
          node: process.env.ELASTICSEARCH_NODE.toString(),
          auth: {
            username: process.env.ELASTICSEARCH_USERNAME.toString(),
            password: process.env.ELASTICSEARCH_PASSWORD.toString(),
          },
        };
      },
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
