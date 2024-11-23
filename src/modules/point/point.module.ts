// point.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointController } from './controller/point.controller';
import { PointService } from './service/point.service';
import { Point } from './entity/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}