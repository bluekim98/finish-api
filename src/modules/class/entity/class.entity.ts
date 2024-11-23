import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Instructor } from '../../intstructor/entity/instructor.entity';
import { Branch } from '../../branch/entity/branch.entity';
import { ClassType } from '../../class-type/entity/class-type.entity';

@Entity('classes') // 테이블 이름을 'classes'로 지정
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instructor)
  instructor: Instructor;

  @ManyToOne(() => Branch)
  branch: Branch;

  @ManyToOne(() => ClassType)
  classType: ClassType;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  maxParticipants: number;

  @Column()
  waitlistCapacity: number;

  @Column({ type: 'timestamp' })
  availableTime: Date;

  @Column({ type: 'timestamp' })
  cancelTime: Date;

  @Column({ type: 'timestamp' })
  changeTime: Date;

  @Column({ type: 'timestamp' })
  closeTime: Date;

  @Column({ type: 'timestamp' })
  autoReserveTime: Date;

  @Column({ type: 'text', nullable: true })
  schedule: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}