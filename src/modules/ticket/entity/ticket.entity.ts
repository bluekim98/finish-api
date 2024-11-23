import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classId: number;

  @Column()
  branchId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: ['count', 'period'] })
  type: string;

  @Column({ nullable: true })
  availableCount: number;

  @Column({ type: 'date' })
  expirationDate: Date;

  @Column()
  maxParticipants: number;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  weeklyUseLimit: number;

  @Column({ nullable: true })
  monthlyUseLimit: number;

  @Column()
  reservationChangeLimit: number;

  @Column({ type: 'json', nullable: true })
  availableTimes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}