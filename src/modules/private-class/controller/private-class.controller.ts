import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PrivateClassService } from '../service/private-class.service';
import { CreatePrivateClassDto, UpdatePrivateClassDto } from '../dto/private-class.dto';

@Controller('private-classes')
export class PrivateClassController {
  
   constructor(private readonly privateClassService: PrivateClassService) {}

   // 프라이빗 수업 생성
   @Post()
   create(@Body() createPrivateClassDto: CreatePrivateClassDto) {
       return this.privateClassService.create(createPrivateClassDto);
   }

   // 모든 프라이빗 수업 조회
   @Get()
   findAll() {
       return this.privateClassService.findAll();
   }

   // 특정 프라이빗 수업 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.privateClassService.findOne(+id);
   }

   // 프라이빗 수업 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updatePrivateClassDto: UpdatePrivateClassDto) {
       return this.privateClassService.update(+id, updatePrivateClassDto);
   }

   // 프라이빗 수업 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.privateClassService.remove(+id);
   }
}