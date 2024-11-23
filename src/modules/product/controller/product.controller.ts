import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductController {
  
   constructor(private readonly productService: ProductService) {}

   // 상품 생성
   @Post()
   create(@Body() createProductDto: CreateProductDto) {
       return this.productService.create(createProductDto);
   }

   // 모든 상품 조회
   @Get()
   findAll() {
       return this.productService.findAll();
   }

   // 특정 상품 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.productService.findOne(+id);
   }

   // 상품 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updateProductDto: UpdateProductDto) {
       return this.productService.update(+id, updateProductDto);
   }

   // 상품 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.productService.remove(+id);
   }
}