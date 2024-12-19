import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Company } from '../entity/company.entity';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateCompanyDto: CreateCompanyDto,
    ) {
        return this.companyService.update(id, updateCompanyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.companyService.remove(id);
    }
    /**
     * ID로 회사 조회 API
     * @param id 회사 ID
     * @returns Company
     */
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Company> {
        return this.companyService.getCompanyById(id);
    }

    /**
     * 관리자 전화번호로 회사 조회 API
     * @param phone 관리자 전화번호
     * @returns Company
     */
    @Get('manager-phone/:phone')
    async findByManagerPhone(@Param('phone') phone: string): Promise<Company> {
        return this.companyService.getCompanyByManagerPhoneNumber(phone);
    }

    /**
     * 관리자 이름으로 회사 조회 API
     * @param name 관리자 이름
     * @returns Company
     */
    @Get('manager-name/:name')
    async findByManagerName(@Param('name') name: string): Promise<Company> {
        return this.companyService.getCompanyByManagerName(name);
    }
}
