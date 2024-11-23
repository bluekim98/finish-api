import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { InstructorService } from '../service/instructor.service';
import { CreateInstructorDto, UpdateInstructorDto } from '../dto/instructor.dto';

@Controller('instructors')
export class InstructorController {
    constructor(private readonly instructorService: InstructorService) {}

    @Post()
    create(@Body() createInstructorDto: CreateInstructorDto) {
        return this.instructorService.create(createInstructorDto);
    }

    // 모든 강사 조회 (페이징 지원)
    @Get()
    findAll(
      @Query('page') page = '1', 
      @Query('limit') limit = '10'
      ) {
        return this.instructorService.findAll(+page, +limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.instructorService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
        return this.instructorService.update(+id, updateInstructorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.instructorService.remove(+id);
    }
}