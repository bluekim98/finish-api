import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageHistory } from '../entity/usage-history.entity';
import { CreateUsageHistoryDto, UpdateUsageHistoryDto } from '../dto/usage-history.dto';

@Injectable()
export class UsageHistoryService {
  
  constructor(
      @InjectRepository(UsageHistory)
      private readonly usageHistoryRepository: Repository<UsageHistory>,
  ) {}

  async create(createUsageHistoryDto: CreateUsageHistoryDto): Promise<UsageHistory> {
      const usageHistory = this.usageHistoryRepository.create(createUsageHistoryDto);
      return this.usageHistoryRepository.save(usageHistory);
  }

  async findAll(): Promise<UsageHistory[]> {
      return this.usageHistoryRepository.find();
  }

  async findOne(id: number): Promise<UsageHistory> {
      const usageHistory = await this.usageHistoryRepository.findOne({ where : { id } });
      if (!usageHistory) {
          throw new NotFoundException(`Usage history with ID ${id} not found`);
      }
      return usageHistory;
  }

  async update(id: number, updateUsageHistoryDto: UpdateUsageHistoryDto): Promise<UsageHistory> {
      const usageHistory = await this.findOne(id);
      Object.assign(usageHistory, updateUsageHistoryDto);
      return this.usageHistoryRepository.save(usageHistory);
  }

  async remove(id: number): Promise<void> {
      const result = await this.usageHistoryRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Usage history with ID ${id} not found`);
      }
  }
}