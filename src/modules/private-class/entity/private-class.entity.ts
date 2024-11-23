import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Instructor } from '../../intstructor/entity/instructor.entity';
import { User } from '../../user/entity/user.entity';

@Entity('private_classes') // 테이블 이름을 'private_classes'로 지정
export class PrivateClass {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instructor) // 강사 관계
  instructor: Instructor;

  @ManyToOne(() => User) // 회원 관계
  user: User;

  @Column({ type: 'timestamp' })
  schedule: Date;

  @Column({ length: 100 })
  room: string;

  @Column({ length: 50 })
  type: string; // 개인, 듀엣, 트리플

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}