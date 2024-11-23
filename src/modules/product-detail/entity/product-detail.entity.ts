import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from '../../product/entity/product.entity';
import { User } from '../../user/entity/user.entity';

@Entity('product_details') // 테이블 이름을 'product_details'로 지정
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product) // 상품 관계
  product: Product;

  @ManyToOne(() => User) // 회원 관계
  user: User;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date; // 상품 이용 기한

  @Column()
  usageCount: number; // 상품 이용 횟수

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  paymentInfo: string; // 결제 정보
}