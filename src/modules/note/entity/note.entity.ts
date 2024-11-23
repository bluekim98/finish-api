import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('notes') // 테이블 이름을 'notes'로 지정
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User) // 회원 관계
  user: User;

  @Column({ type: 'text' })
  content: string; // 메모 내용

  @CreateDateColumn()
  createdAt: Date; // 생성 날짜

  @UpdateDateColumn()
  updatedAt: Date; // 수정 날짜

  @Column({ type: 'text', nullable: true })
  imageUrl?: string; // 첨부된 사진 URL (선택적)
}