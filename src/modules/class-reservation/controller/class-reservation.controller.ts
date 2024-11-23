import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClassReservationService } from '../service/class-reservation.service';
import { CreateClassReservationDto, UpdateClassReservationDto } from '../dto/class-reservation.dto';

@Controller('class-reservations')
export class ClassReservationController {
  
   constructor(private readonly classReservationService: ClassReservationService) {}

   // 수업 예약 생성
   @Post()
   create(@Body() createClassReservationDto: CreateClassReservationDto) {
       return this.classReservationService.create(createClassReservationDto);
   }

   // 모든 수업 예약 조회
   @Get()
   findAll() {
       return this.classReservationService.findAll();
   }

   // 특정 수업 예약 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.classReservationService.findOne(+id);
   }

   // 수업 예약 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updateClassReservationDto: UpdateClassReservationDto) {
       return this.classReservationService.update(+id, updateClassReservationDto);
   }

   // 수업 예약 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.classReservationService.remove(+id);
   }
}