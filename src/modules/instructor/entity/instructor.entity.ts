import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  contact: string;

  @Column({ type: 'json', nullable: true })
  notificationSettings: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'text', nullable: true })
  career: string;

  @Column({ type: 'json', nullable: true })
  workingHours: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  workingDays: string[];
}