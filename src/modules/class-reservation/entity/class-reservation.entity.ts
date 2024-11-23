import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { PrivateClass } from '../../private-class/entity/private-class.entity';
import { Class } from '../../class/entity/class.entity';

@Entity('class_reservations') // 테이블 이름을 'class_reservations'로 지정
export class ClassReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User) // 회원 관계 (User)
  user: User;

  @ManyToOne(() => Class) // 수업 관계
  class: Class;

  @ManyToOne(() => PrivateClass, { nullable: true }) // 프라이빗 수업 관계 (선택적)
  privateClass: PrivateClass;

  @Column({ type: 'timestamp' })
  reservationTime: Date;

  @Column({ length: 100 })
  room: string;

  @Column({ length: 50 })
  status: string; // 예약 상태 (예: 예약 대기, 예약 확정, 취소 등)

  @Column({ type: 'timestamp', nullable: true })
  statusChangeTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}