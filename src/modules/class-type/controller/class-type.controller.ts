import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ClassTypeService } from '../service/class-type.service';
import { CreateClassTypeDto, UpdateClassTypeDto } from '../dto/class-type.dto';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard'; // JWT 인증 가드

@Controller('class-types')
export class ClassTypeController {
    constructor(private readonly classTypeService: ClassTypeService) {}

    // 수업 구분 생성 (인증된 사용자만 가능)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createClassTypeDto: CreateClassTypeDto) {
        return this.classTypeService.create(createClassTypeDto);
    }

    // 모든 수업 구분 조회 (인증 불필요)
    @Get()
    findAll() {
        return this.classTypeService.findAll();
    }

    // 특정 수업 구분 조회 (인증 불필요)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classTypeService.findOne(+id);
    }

    // 수업 구분 수정 (인증된 사용자만 가능)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClassTypeDto: UpdateClassTypeDto) {
        return this.classTypeService.update(+id, updateClassTypeDto);
    }

    // 수업 구분 삭제 (인증된 사용자만 가능)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.classTypeService.remove(+id);
    }
}