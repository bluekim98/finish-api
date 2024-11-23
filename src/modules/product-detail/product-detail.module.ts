// product-detail.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetailController } from './controller/product-detail.controller';
import { ProductDetailService } from './service/product-detail.service';
import { ProductDetail } from './entity/product-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail])],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}