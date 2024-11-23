import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrivateClass } from '../entity/private-class.entity';
import { CreatePrivateClassDto, UpdatePrivateClassDto } from '../dto/private-class.dto';

@Injectable()
export class PrivateClassService {
  
  constructor(
      @InjectRepository(PrivateClass)
      private readonly privateClassRepository: Repository<PrivateClass>,
  ) {}

  async create(createPrivateClassDto: CreatePrivateClassDto): Promise<PrivateClass> {
      const privateClass = this.privateClassRepository.create(createPrivateClassDto);
      return this.privateClassRepository.save(privateClass);
  }

  async findAll(): Promise<PrivateClass[]> {
      return this.privateClassRepository.find();
  }

  async findOne(id: number): Promise<PrivateClass> {
      const privateClass = await this.privateClassRepository.findOne({ where : { id } });
      if (!privateClass) {
          throw new NotFoundException(`Private class with ID ${id} not found`);
      }
      return privateClass;
  }

  async update(id: number, updatePrivateClassDto: UpdatePrivateClassDto): Promise<PrivateClass> {
      const privateClass = await this.findOne(id);
      Object.assign(privateClass, updatePrivateClassDto);
      return this.privateClassRepository.save(privateClass);
  }

  async remove(id: number): Promise<void> {
      const result = await this.privateClassRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Private class with ID ${id} not found`);
      }
  }
}