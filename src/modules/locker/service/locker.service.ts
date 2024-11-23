import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locker } from '../entity/locker.entity';
import { CreateLockerDto, UpdateLockerDto } from '../dto/locker.dto';

@Injectable()
export class LockerService {
  
  constructor(
      @InjectRepository(Locker)
      private readonly lockerRepository: Repository<Locker>,
  ) {}

  async create(createLockerDto: CreateLockerDto): Promise<Locker> {
      const locker = this.lockerRepository.create(createLockerDto);
      return this.lockerRepository.save(locker);
  }

  async findAll(): Promise<Locker[]> {
      return this.lockerRepository.find();
  }

  async findOne(id: number): Promise<Locker> {
      const locker = await this.lockerRepository.findOne({ where : { id } });
      if (!locker) {
          throw new NotFoundException(`Locker with ID ${id} not found`);
      }
      return locker;
  }

  async update(id: number, updateLockerDto: UpdateLockerDto): Promise<Locker> {
      const locker = await this.findOne(id);
      Object.assign(locker, updateLockerDto);
      return this.lockerRepository.save(locker);
  }

  async remove(id: number): Promise<void> {
      const result = await this.lockerRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Locker with ID ${id} not found`);
      }
  }
}