// private-class.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateClassController } from './controller/private-class.controller';
import { PrivateClassService } from './service/private-class.service';
import { PrivateClass } from './entity/private-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateClass])],
  controllers: [PrivateClassController],
  providers: [PrivateClassService],
})
export class PrivateClassModule {}