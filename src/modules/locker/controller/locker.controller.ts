import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LockerService } from '../service/locker.service';
import { CreateLockerDto, UpdateLockerDto } from '../dto/locker.dto';

@Controller('lockers')
export class LockerController {
  
   constructor(private readonly lockerService: LockerService) {}

   // 락커 생성
   @Post()
   create(@Body() createLockerDto: CreateLockerDto) {
       return this.lockerService.create(createLockerDto);
   }

   // 모든 락커 조회
   @Get()
   findAll() {
       return this.lockerService.findAll();
   }

   // 특정 락커 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.lockerService.findOne(+id);
   }

   // 락커 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updateLockerDto: UpdateLockerDto) {
       return this.lockerService.update(+id, updateLockerDto);
   }

   // 락커 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.lockerService.remove(+id);
   }
}