import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('points') // 테이블 이름을 'points'로 지정
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User) // 회원 관계
  user: User;

  @Column('decimal')
  amount: number; // 포인트 금액

  @Column({ length: 50 })
  type: string; // 구분 (적립, 차감, 소멸)

  @Column({ length: 50 })
  category: string; // 분류 (발급, 변경, 업그레이드 등)

  @Column({ type: 'text', nullable: true })
  reason?: string; // 포인트 수정 이유

  @CreateDateColumn()
  createdAt: Date; // 생성 날짜
}