import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductDetailService } from '../service/product-detail.service';
import { CreateProductDetailDto, UpdateProductDetailDto } from '../dto/product-detail.dto';

@Controller('product-details')
export class ProductDetailController {
  
   constructor(private readonly productDetailService: ProductDetailService) {}

   // 상품 상세 생성
   @Post()
   create(@Body() createProductDetailDto: CreateProductDetailDto) {
       return this.productDetailService.create(createProductDetailDto);
   }

   // 모든 상품 상세 조회
   @Get()
   findAll() {
       return this.productDetailService.findAll();
   }

   // 특정 상품 상세 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.productDetailService.findOne(+id);
   }

   // 상품 상세 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updateProductDetailDto: UpdateProductDetailDto) {
       return this.productDetailService.update(+id, updateProductDetailDto);
   }

   // 상품 상세 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.productDetailService.remove(+id);
   }
}