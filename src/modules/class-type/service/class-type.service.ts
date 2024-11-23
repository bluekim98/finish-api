import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { ClassType } from '../entity/class-type.entity';
import { CreateClassTypeDto, UpdateClassTypeDto } from '../dto/class-type.dto';

@Injectable()
export class ClassTypeService {
    constructor(
        @InjectRepository(ClassType)
        private readonly classTypeRepository: Repository<ClassType>,
    ) {}

    async create(createClassTypeDto: CreateClassTypeDto): Promise<ClassType> {
        const classType = this.classTypeRepository.create(createClassTypeDto);
        return this.classTypeRepository.save(classType);
    }

    async findAll(): Promise<ClassType[]> {
        return this.classTypeRepository.find();
    }

    async findOne(id: number): Promise<ClassType> {
        const classType = await this.classTypeRepository.findOne({ where: { id } });
        if (!classType) {
            throw new NotFoundException(`Class type not found`);
        }
        return classType;
    }

    async update(id: number, updateClassTypeDto: UpdateClassTypeDto): Promise<ClassType> {
        const classType = await this.findOne(id);
        Object.assign(classType, updateClassTypeDto);
        return this.classTypeRepository.save(classType);
    }

    async remove(id: number): Promise<void> {
        const result = await this.classTypeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Class type with ID ${id} not found`);
        }
    }
}