// locker.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerController } from './controller/locker.controller';
import { LockerService } from './service/locker.service';
import { Locker } from './entity/locker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [LockerController],
  providers: [LockerService],
})
export class LockerModule {}