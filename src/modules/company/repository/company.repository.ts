import { DataSource, Repository } from 'typeorm';
import { Company } from '@src/modules/company/entity/company.entity';
import { Injectable } from '@nestjs/common';
import { ExceptionCode } from '@src/common/enums/exception-code.enum';

@Injectable()
export class CompanyRepository extends Repository<Company> {
    constructor(private readonly dataSource: DataSource) {
        super(Company, dataSource.createEntityManager());
    }
    // 커스텀 메서드 예시 (필요에 따라 추가 가능)
    async findByName(name: string): Promise<Company[]> {
        return this.find({ where: { name } });
    }

    /**
     * ID로 회사 조회. 없을 경우 예외 발생.
     * @param id 회사 ID
     * @returns Company
     */
    async findByIdOrFail(id: number): Promise<Company> {
        const company = await this.findOne({ where: { id } });
        if (!company) {
            throw {
                code: ExceptionCode.COMPANY_NOT_FOUND,
                message: `Company with ID "${id}" not found`,
            };
        }
        return company;
    }

    /**
     * 관리자 전화번호로 회사 조회. 없을 경우 예외 발생.
     * @param managerPhoneNumber 관리자 전화번호
     * @returns Company
     */
    async findByManagerPhoneNumberOrFail(
        managerPhoneNumber: string,
    ): Promise<Company> {
        const company = await this.findOne({
            where: { managerPhoneNumber },
        });
        if (!company) {
            throw {
                code: ExceptionCode.COMPANY_NOT_FOUND,
                message: `Company with manager phone number "${managerPhoneNumber}" not found`,
            };
        }
        return company;
    }

    /**
     * 관리자 이름으로 회사 조회. 없을 경우 예외 발생.
     * @param managerName 관리자 이름
     * @returns Company
     */
    async findByManagerNameOrFail(managerName: string): Promise<Company> {
        const company = await this.findOne({ where: { managerName } });
        if (!company) {
            throw {
                code: ExceptionCode.COMPANY_NOT_FOUND,
                message: `Company with manager name "${managerName}" not found`,
            };
        }
        return company;
    }
    /**
     * 회사 이름으로 회사 조회. 없을 경우 예외 발생.
     * @param name 회사 이름
     * @returns Company
     */
    async findByNameOrFail(name: string): Promise<Company> {
        const company = await this.findOne({ where: { name } });
        if (!company) {
            throw {
                code: ExceptionCode.COMPANY_NOT_FOUND,
                message: `Company with name "${name}" not found`,
            };
        }
        return company;
    }

    /**
     * 회사 전화번호로 회사 조회. 없을 경우 예외 발생.
     * @param phoneNumber 회사 전화번호
     * @returns Company
     */
    async findByPhoneNumberOrFail(phoneNumber: string): Promise<Company> {
        const company = await this.findOne({ where: { phoneNumber } });
        if (!company) {
            throw {
                code: ExceptionCode.COMPANY_NOT_FOUND,
                message: `Company with phone number "${phoneNumber}" not found`,
            };
        }
        return company;
    }
}
