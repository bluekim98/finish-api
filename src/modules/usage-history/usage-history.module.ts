// usage-history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageHistoryController } from './controller/usage-history.controller';
import { UsageHistoryService } from './service/usage-history.service';
import { UsageHistory } from './entity/usage-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsageHistory])],
  controllers: [UsageHistoryController],
  providers: [UsageHistoryService],
})
export class UsageHistoryModule {}