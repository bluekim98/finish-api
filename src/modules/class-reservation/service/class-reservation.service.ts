import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassReservation } from '../entity/class-reservation.entity';
import { CreateClassReservationDto, UpdateClassReservationDto } from '../dto/class-reservation.dto';

@Injectable()
export class ClassReservationService {
  
  constructor(
      @InjectRepository(ClassReservation)
      private readonly classReservationRepository: Repository<ClassReservation>,
  ) {}

  async create(createClassReservationDto: CreateClassReservationDto): Promise<ClassReservation> {
      const reservation = this.classReservationRepository.create(createClassReservationDto);
      return this.classReservationRepository.save(reservation);
  }

  async findAll(): Promise<ClassReservation[]> {
      return this.classReservationRepository.find();
  }

  async findOne(id: number): Promise<ClassReservation> {
      const reservation = await this.classReservationRepository.findOne({ where : { id } });
      if (!reservation) {
          throw new NotFoundException(`Class reservation with ID ${id} not found`);
      }
      return reservation;
  }

  async update(id: number, updateClassReservationDto: UpdateClassReservationDto): Promise<ClassReservation> {
      const reservation = await this.findOne(id);
      Object.assign(reservation, updateClassReservationDto);
      return this.classReservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
      const result = await this.classReservationRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Class reservation with ID ${id} not found`);
      }
  }
}