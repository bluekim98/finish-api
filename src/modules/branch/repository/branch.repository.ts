// branch.repository.ts
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Branch } from '../entity/branch.entity';

@Injectable()
export class BranchRepository extends Repository<Branch> {
  constructor(private dataSource: DataSource) {
    super(Branch, dataSource.createEntityManager());
  }

  // 여기에 커스텀 메서드를 추가할 수 있습니다.
  async findByName(name: string): Promise<Branch[]> {
    return this.createQueryBuilder('branch')
      .where('branch.name = :name', { name })
      .getMany();
  }

  async findWithPagination(page: number, limit: number): Promise<[Branch[], number]> {
    const [branches, total] = await this.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return [branches, total];
  }
}