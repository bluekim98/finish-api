import { DataSource, Repository } from 'typeorm';
import { Branch } from '../entity/branch.entity';
import { ExceptionCode } from '@src/common/enums/exception-code.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BranchRepository extends Repository<Branch> {
    constructor(private readonly dataSource: DataSource) {
        super(Branch, dataSource.createEntityManager());
    }
    /**
     * ID로 지점 조회. 없을 경우 예외 발생.
     * @param id 지점점 ID
     * @returns Company
     */
    async findByIdOrFail(id: number): Promise<Branch> {
        const branch = await this.findOne({ where: { id } });
        if (!branch) {
            throw {
                code: ExceptionCode.BRANCH_NOT_FOUND,
                message: `Branch with ID "${id}" not found`,
            };
        }
        return branch;
    }

    /**
     * 이름으로 Branch를 찾거나 실패 시 예외를 던짐
     */
    async findByNameOrFail(name: string): Promise<Branch> {
        const branch = await this.findOne({ where: { name } });
        if (!branch) {
            throw {
                code: ExceptionCode.BRANCH_NOT_FOUND,
                message: `Branch with name "${name}" not found`,
            };
        }
        return branch;
    }

    /**
     * 전화번호로 Branch를 찾거나 실패 시 예외를 던짐
     */
    async findByPhoneNumberOrFail(phoneNumber: string): Promise<Branch> {
        const branch = await this.findOne({ where: { phoneNumber } });
        if (!branch) {
            throw {
                code: ExceptionCode.BRANCH_NOT_FOUND,
                message: `Branch with phone number "${phoneNumber}" not found`,
            };
        }
        return branch;
    }

    /**
     * 매니저(User)로 Branch를 찾거나 실패 시 예외를 던짐
     */
    async findByManagerOrFail(managerId: number): Promise<Branch> {
        const branch = await this.findOne({
            where: { manager: { id: managerId } },
            relations: ['manager'],
        });
        if (!branch) {
            throw {
                code: ExceptionCode.BRANCH_NOT_FOUND,
                message: `Branch with manager ID "${managerId}" not found`,
            };
        }
        return branch;
    }

    /**
     * 매니저(User)가 관리하는 Branch 목록 조회
     * @param managerId 매니저 ID
     * @returns Branch[]
     */
    async findBranchesByManager(managerId: number): Promise<Branch[]> {
        const branches = await this.find({
            where: { manager: { id: managerId } },
            relations: ['manager', 'company'], // 필요한 관계 추가
        });

        if (branches.length === 0) {
            throw {
                code: ExceptionCode.BRANCH_NOT_FOUND,
                message: `No branches found for manager with ID "${managerId}"`,
            };
        }

        return branches;
    }

    /**
     * 일반 사용자(User)가 속한 Branch 조회
     * @param userId 사용자 ID
     * @returns Branch
     */
    async findBranchByUser(userId: number): Promise<Branch> {
        const branch = await this.createQueryBuilder('branch')
            .innerJoin('branch.users', 'user', 'user.id = :userId', { userId })
            .leftJoinAndSelect('branch.company', 'company') // 필요한 관계 추가
            .getOne();

        if (!branch) {
            throw {
                code: ExceptionCode.BRANCH_NOT_FOUND,
                message: `No branch found for user with ID "${userId}"`,
            };
        }

        return branch;
    }

    /**
     * 회사의 관리자가 관리하는 Branch 목록 조회
     * @param managerPhoneNumber 관리자 전화번호
     * @returns Branch[]
     */
    async findBranchesByCompanyManager(
        managerPhoneNumber: string,
    ): Promise<Branch[]> {
        const branches = await this.createQueryBuilder('branch')
            .innerJoinAndSelect('branch.company', 'company')
            .where('company.managerPhoneNumber = :managerPhoneNumber', {
                managerPhoneNumber,
            })
            .leftJoinAndSelect('branch.manager', 'manager') // 필요 시 지점 매니저 정보도 로드
            .getMany();

        if (branches.length === 0) {
            throw {
                code: ExceptionCode.BRANCH_NOT_FOUND,
                message: `No branches found for company manager with phone number "${managerPhoneNumber}"`,
            };
        }

        return branches;
    }
    /**
     * 특정 User가 속한 Branch와 관련된 Company 정보를 조회
     * @param userId 사용자 ID
     * @returns Branch | null
     */
    async findBranchWithCompanyByUser(userId: number): Promise<Branch | null> {
        return await this.createQueryBuilder('branch')
            .innerJoinAndSelect('branch.company', 'company') // Company 정보 로드
            .innerJoin('branch.users', 'user', 'user.id = :userId', { userId }) // User와 연결된 Branch 조회
            .getOne();
    }
}
