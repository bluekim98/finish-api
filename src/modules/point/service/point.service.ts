import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from '../entity/point.entity';
import { CreatePointDto, UpdatePointDto } from '../dto/point.dto';

@Injectable()
export class PointService {
  
  constructor(
      @InjectRepository(Point)
      private readonly pointRepository: Repository<Point>,
  ) {}

  async create(createPointDto: CreatePointDto): Promise<Point> {
      const point = this.pointRepository.create(createPointDto);
      return this.pointRepository.save(point);
  }

  async findAll(): Promise<Point[]> {
      return this.pointRepository.find();
  }

  async findOne(id: number): Promise<Point> {
      const point = await this.pointRepository.findOne({ where : { id } });
      if (!point) {
          throw new NotFoundException(`Point with ID ${id} not found`);
      }
      return point;
  }

  async update(id: number, updatePointDto: UpdatePointDto): Promise<Point> {
      const point = await this.findOne(id);
      Object.assign(point, updatePointDto);
      return this.pointRepository.save(point);
  }

  async remove(id: number): Promise<void> {
      const result = await this.pointRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Point with ID ${id} not found`);
      }
  }
}