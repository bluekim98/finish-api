// instructor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorController } from './controller/instructor.controller';
import { InstructorService } from './service/instructor.service';
import { Instructor } from './entity/instructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor])],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule {}