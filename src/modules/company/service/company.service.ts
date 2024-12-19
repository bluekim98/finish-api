import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../repository/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Company } from '../entity/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository,
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const company = this.companyRepository.create(createCompanyDto);
        return this.companyRepository.save(company);
    }

    async findAll(): Promise<Company[]> {
        return this.companyRepository.find();
    }

    /**
     * ID로 회사 조회
     * @param id 회사 ID
     * @returns Company
     */
    async getCompanyById(id: number): Promise<Company> {
        return this.companyRepository.findByIdOrFail(id);
    }

    /**
     * 관리자 전화번호로 회사 조회
     * @param phoneNumber 관리자 전화번호
     * @returns Company
     */
    async getCompanyByManagerPhoneNumber(
        phoneNumber: string,
    ): Promise<Company> {
        return this.companyRepository.findByManagerPhoneNumberOrFail(
            phoneNumber,
        );
    }

    /**
     * 관리자 이름으로 회사 조회
     * @param name 관리자 이름
     * @returns Company
     */
    async getCompanyByManagerName(name: string): Promise<Company> {
        return this.companyRepository.findByManagerNameOrFail(name);
    }

    async update(
        id: number,
        updateCompanyDto: CreateCompanyDto,
    ): Promise<Company> {
        const company = await this.companyRepository.findByIdOrFail(id);
        Object.assign(company, updateCompanyDto);
        return this.companyRepository.save(company);
    }

    async remove(id: number): Promise<void> {
        const company = await this.companyRepository.findByIdOrFail(id);
        await this.companyRepository.remove(company);
    }
}
