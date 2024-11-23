import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from '../entity/instructor.entity';
import { CreateInstructorDto, UpdateInstructorDto } from '../dto/instructor.dto';

@Injectable()
export class InstructorService {
    constructor(
        @InjectRepository(Instructor)
        private readonly instructorRepository: Repository<Instructor>,
    ) {}

    async create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
        const instructor = this.instructorRepository.create(createInstructorDto);
        return this.instructorRepository.save(instructor);
    }

    async findAll(page = 1, limit = 10): Promise<{ data: Instructor[]; totalCount: number }> {
        const [data, totalCount] = await this.instructorRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, totalCount };
    }

    async findOne(id: number): Promise<Instructor> {
        const instructor = await this.instructorRepository.findOne({where : { id }});
        if (!instructor) {
            throw new NotFoundException(`Instructor with ID ${id} not found`);
        }
        return instructor;
    }

    async update(id: number, updateInstructorDto: UpdateInstructorDto): Promise<Instructor> {
        const instructor = await this.findOne(id);
        Object.assign(instructor, updateInstructorDto);
        return this.instructorRepository.save(instructor);
    }

    async remove(id: number): Promise<void> {
        const result = await this.instructorRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Instructor with ID ${id} not found`);
        }
    }
}
