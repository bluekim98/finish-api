import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Branch } from '../../branch/entity/branch.entity';
import { User } from '../../user/entity/user.entity';

@Entity('lockers') // 테이블 이름을 'lockers'로 지정
export class Locker {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch) // 지점 관계
  branch: Branch;

  @Column({ length: 100 })
  lockerName: string; // 락커 이름 또는 번호

  @Column()
  isInUse: boolean; // 현재 사용 중인지 여부

  @ManyToOne(() => User, { nullable: true }) // 회원 관계 (선택적)
  user: User;
}