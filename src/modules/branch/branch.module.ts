// branch.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController } from './controller/branch.controller';
import { BranchService } from './service/branch.service';
import { Branch } from './entity/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}