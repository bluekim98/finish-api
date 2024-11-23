// class-reservation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassReservationController } from './controller/class-reservation.controller';
import { ClassReservationService } from './service/class-reservation.service';
import { ClassReservation } from './entity/class-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassReservation])],
  controllers: [ClassReservationController],
  providers: [ClassReservationService],
})
export class ClassReservationModule {}