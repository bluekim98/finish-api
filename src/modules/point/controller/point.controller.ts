import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PointService } from '../service/point.service';
import { CreatePointDto, UpdatePointDto } from '../dto/point.dto';

@Controller('points')
export class PointController {
  
   constructor(private readonly pointService: PointService) {}

   // 포인트 생성
   @Post()
   create(@Body() createPointDto: CreatePointDto) {
       return this.pointService.create(createPointDto);
   }

   // 모든 포인트 조회
   @Get()
   findAll() {
       return this.pointService.findAll();
   }

   // 특정 포인트 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.pointService.findOne(+id);
   }

   // 포인트 정보 수정
   @Patch(':id')
   update(@Param('id') id: string,
          @Body() updatePointDto: UpdatePointDto) {
       return this.pointService.update(+id, updatePointDto);
   }

   // 포인트 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.pointService.remove(+id);
   }
}