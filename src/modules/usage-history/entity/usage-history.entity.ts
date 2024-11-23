import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Class } from '../../class/entity/class.entity';

@Entity('usage_histories') // 테이블 이름을 'usage_histories'로 지정
export class UsageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User) // 회원 관계
  user: User;

  @ManyToOne(() => Class) // 수업 관계
  class: Class;

  @Column({ type: 'date' })
  reservationDate: Date; // 이용 날짜

  @Column({ length: 100 })
  instructorName: string; // 이용 강사 이름

  @Column({ length: 50 })
  status: string; // 이용 상태 (예약 대기, 예약 확정, 출석, 결석 등)

  @Column({ type: 'timestamp', nullable: true })
  statusChangeTime: Date; // 상태 변경 시간

  @Column({ length: 100 })
  modifiedBy: string; // 상태 변경 담당자
}