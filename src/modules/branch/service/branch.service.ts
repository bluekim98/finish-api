import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchRepository } from '../repository/branch.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { CompanyRepository } from '../../company/repository/company.repository';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { Company } from '../../company/entity/company.entity';
import { User } from '../../user/entity/user.entity';
import { Branch } from '../entity/branch.entity';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(BranchRepository)
        private readonly branchRepository: BranchRepository,
        // Assuming we have repositories for Company and User
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository,
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
    ) {}

    async create(createBranchDto: CreateBranchDto): Promise<Branch> {
        const company = await this.companyRepository.findByIdOrFail(
            createBranchDto.companyId,
        );
        if (!company) throw new NotFoundException('Company not found');

        const manager = await this.userRepository.findByIdOrFail(
            createBranchDto.managerId,
        );
        if (!manager) throw new NotFoundException('Manager not found');

        const branch = this.branchRepository.create({
            ...createBranchDto,
            company,
            manager,
        });

        return await this.branchRepository.save(branch);
    }

    async findAll(): Promise<Branch[]> {
        return await this.branchRepository.find({
            relations: ['company', 'manager'],
        });
    }

    async getBranchById(id: number): Promise<Branch> {
        return await this.branchRepository.findByIdOrFail(id);
    }

    async update(
        id: number,
        updateBranchDto: UpdateBranchDto,
    ): Promise<Branch> {
        const branch = await this.branchRepository.findByIdOrFail(id);

        if (updateBranchDto.companyId) {
            const company = await this.companyRepository.findByIdOrFail(
                updateBranchDto.companyId,
            );
            branch.company = company;
        }

        if (updateBranchDto.managerId) {
            const manager = await this.userRepository.findByIdOrFail(
                updateBranchDto.managerId,
            );
            branch.manager = manager;
        }

        Object.assign(branch, updateBranchDto);

        return await this.branchRepository.save(branch);
    }

    async remove(id: number): Promise<void> {
        const branch = await this.branchRepository.findByIdOrFail(id);
        await this.branchRepository.remove(branch);
    }

    /**
     * 매니저(User)가 관리하는 Branch 목록 조회
     * @param managerId 매니저 ID
     * @returns Branch[]
     */
    async getBranchesByManager(managerId: number): Promise<Branch[]> {
        return await this.branchRepository.findBranchesByManager(managerId);
    }

    /**
     * 일반 사용자(User)가 속한 Branch 조회
     * @param userId 사용자 ID
     * @returns Branch
     */
    async getBranchByUser(userId: number): Promise<Branch> {
        return await this.branchRepository.findBranchByUser(userId);
    }

    /**
     * 회사의 관리자가 관리하는 Branch 목록 조회
     * @param managerPhoneNumber 관리자 전화번호
     * @returns Branch[]
     */
    async getBranchesByCompanyManager(
        managerPhoneNumber: string,
    ): Promise<Branch[]> {
        return await this.branchRepository.findBranchesByCompanyManager(
            managerPhoneNumber,
        );
    }

    /**
     * 특정 User가 속한 Branch와 관련된 Company 정보를 조회
     * @param userId 사용자 ID
     * @returns Branch
     */
    async getBranchWithCompanyByUser(userId: number): Promise<Branch> {
        const branch = await this.branchRepository.findBranchWithCompanyByUser(
            userId,
        );

        if (!branch) {
            throw {
                code: 'BRANCH_NOT_FOUND',
                message: `No branch found for user with ID "${userId}"`,
            };
        }

        return branch;
    }
}
