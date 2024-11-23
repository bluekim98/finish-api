import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClassService } from '../service/class.service';
import { CreateClassDto, UpdateClassDto } from '../dto/class.dto';

@Controller('classes')
export class ClassController {
  
   constructor(private readonly classService: ClassService) {}

   // 수업 생성
   @Post()
   create(@Body() createClassDto: CreateClassDto) {
       return this.classService.create(createClassDto);
   }

   // 모든 수업 조회
   @Get()
   findAll() {
       return this.classService.findAll();
   }

   // 특정 수업 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.classService.findOne(+id);
   }

   // 수업 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updateClassDto: UpdateClassDto) {
       return this.classService.update(+id, updateClassDto);
   }

   // 수업 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.classService.remove(+id);
   }
}