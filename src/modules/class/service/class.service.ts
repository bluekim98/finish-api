import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../entity/class.entity';
import { CreateClassDto, UpdateClassDto } from '../dto/class.dto';

@Injectable()
export class ClassService {
  
  constructor(
      @InjectRepository(Class)
      private readonly classRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
      const newClass = this.classRepository.create(createClassDto);
      return this.classRepository.save(newClass);
  }

  async findAll(): Promise<Class[]> {
      return this.classRepository.find();
  }

  async findOne(id: number): Promise<Class> {
      const foundClass = await this.classRepository.findOne({ where : { id } });
      if (!foundClass) {
          throw new NotFoundException(`Class with ID ${id} not found`);
      }
      return foundClass;
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
      const existingClass = await this.findOne(id);
      Object.assign(existingClass, updateClassDto);
      return this.classRepository.save(existingClass);
  }

  async remove(id: number): Promise<void> {
      const result = await this.classRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Class with ID ${id} not found`);
      }
  }
}