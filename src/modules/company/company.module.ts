import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './service/company.service';
import { CompanyRepository } from './repository/company.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyRepository])],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}
