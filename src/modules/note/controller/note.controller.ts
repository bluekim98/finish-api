import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { CreateNoteDto, UpdateNoteDto } from '../dto/note.dto';

@Controller('notes')
export class NoteController {
  
   constructor(private readonly noteService: NoteService) {}

   // 메모 생성
   @Post()
   create(@Body() createNoteDto: CreateNoteDto) {
       return this.noteService.create(createNoteDto);
   }

   // 모든 메모 조회
   @Get()
   findAll() {
       return this.noteService.findAll();
   }

   // 특정 메모 조회
   @Get(':id')
   findOne(@Param('id') id: string) {
       return this.noteService.findOne(+id);
   }

   // 메모 정보 수정
   @Patch(':id')
   update(@Param('id') id: string, 
          @Body() updateNoteDto: UpdateNoteDto) {
       return this.noteService.update(+id, updateNoteDto);
   }

   // 메모 삭제
   @Delete(':id')
   remove(@Param('id') id: string) {
       return this.noteService.remove(+id);
   }
}