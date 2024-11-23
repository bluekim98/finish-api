// class-type.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassTypeController } from './controller/class-type.controller';
import { ClassTypeService } from './service/class-type.service';
import { ClassType } from './entity/class-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassType])],
  controllers: [ClassTypeController],
  providers: [ClassTypeService],
})
export class ClassTypeModule {}