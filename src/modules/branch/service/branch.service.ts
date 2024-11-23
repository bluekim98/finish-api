// branch.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Branch } from '../entity/branch.entity';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { BranchRepository } from '../repository/branch.repository';

@Injectable()
export class BranchService {
  constructor(private branchRepository: BranchRepository) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = this.branchRepository.create(createBranchDto);
    return await this.branchRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return await this.branchRepository.find();
  }

  async findOne(id: number): Promise<Branch> {
    const branch = await this.branchRepository.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);
    Object.assign(branch, updateBranchDto);
    return await this.branchRepository.save(branch);
  }

  async remove(id: number): Promise<void> {
    const result = await this.branchRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
  }

  // 커스텀 메서드 사용 예시
  async findByName(name: string): Promise<Branch[]> {
    return await this.branchRepository.findByName(name);
  }

  async findWithPagination(page: number, limit: number): Promise<[Branch[], number]> {
    return await this.branchRepository.findWithPagination(page, limit);
  }
}