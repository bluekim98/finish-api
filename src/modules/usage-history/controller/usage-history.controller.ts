import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsageHistoryService } from '../service/usage-history.service';
import { CreateUsageHistoryDto, UpdateUsageHistoryDto } from '../dto/usage-history.dto';

@Controller('usage-histories')
export class UsageHistoryController {
  
   constructor(private readonly usageHistoryService: UsageHistoryService) {}

   // 이용내역 생성
   @Post()
   create(@Body() createUsageHistoryDto: CreateUsageHistoryDto) {
       return this.usageHistoryService.create(createUsageHistoryDto);
   }

   // 모든 이용내역 조회
   @Get()
   findAll() {
       return this.usageHistoryService.findAll();
   }

   // 특정 이용내역 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.usageHistoryService.findOne(+id);
   }

   // 이용내역 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updateUsageHistoryDto: UpdateUsageHistoryDto) {
       return this.usageHistoryService.update(+id, updateUsageHistoryDto);
   }

   // 이용내역 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.usageHistoryService.remove(+id);
   }
}