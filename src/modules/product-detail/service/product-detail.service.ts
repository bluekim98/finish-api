import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetail } from '../entity/product-detail.entity';
import { CreateProductDetailDto, UpdateProductDetailDto } from '../dto/product-detail.dto';

@Injectable()
export class ProductDetailService {
  
  constructor(
      @InjectRepository(ProductDetail)
      private readonly productDetailRepository: Repository<ProductDetail>,
  ) {}

  async create(createProductDetailDto: CreateProductDetailDto): Promise<ProductDetail> {
      const productDetail = this.productDetailRepository.create(createProductDetailDto);
      return this.productDetailRepository.save(productDetail);
  }

  async findAll(): Promise<ProductDetail[]> {
      return this.productDetailRepository.find();
  }

  async findOne(id: number): Promise<ProductDetail> {
      const productDetail = await this.productDetailRepository.findOne({ where : { id } });
      if (!productDetail) {
          throw new NotFoundException(`Product detail with ID ${id} not found`);
      }
      return productDetail;
  }

  async update(id: number, updateProductDetailDto: UpdateProductDetailDto): Promise<ProductDetail> {
      const productDetail = await this.findOne(id);
      Object.assign(productDetail, updateProductDetailDto);
      return this.productDetailRepository.save(productDetail);
  }

  async remove(id: number): Promise<void> {
      const result = await this.productDetailRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Product detail with ID ${id} not found`);
      }
  }
}