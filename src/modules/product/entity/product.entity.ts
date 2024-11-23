import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Branch } from '../../branch/entity/branch.entity';

@Entity('products') // 테이블 이름을 'products'로 지정
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch) // 지점 관계
  branch: Branch;

  @Column({ length: 50 })
  productType: string; // 판매 상품 또는 대여 상품 유형

  @Column({ length: 100 })
  name: string; // 상품 이름

  @Column('decimal')
  price: number; // 상품 가격

  @Column()
  rewardPoints: number; // 구매 시 적립되는 포인트

  @Column({ type: 'date', nullable: true })
  expirationDate: Date; // 상품 사용 기한

  @Column()
  availableCount: number; // 이용 가능 횟수

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}