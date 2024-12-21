import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { BranchService } from '../service/branch.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';

@Controller('branches')
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @Post()
    create(@Body() createBranchDto: CreateBranchDto) {
        return this.branchService.create(createBranchDto);
    }

    @Get()
    findAll() {
        return this.branchService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.branchService.getBranchById(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateBranchDto: UpdateBranchDto) {
        return this.branchService.update(id, updateBranchDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.branchService.remove(+id);
    }
    /**
     * 매니저가 관리하는 모든 지점 조회
     * @param managerId 매니저 ID
     */
    @Get('manager/:managerId')
    async getBranchesByManager(@Param('managerId') managerId: number) {
        return await this.branchService.getBranchesByManager(+managerId);
    }

    /**
     * 일반 사용자가 속한 지점 조회
     * @param userId 사용자 ID
     */
    @Get('user/:userId')
    async getBranchByUser(@Param('userId') userId: number) {
        return await this.branchService.getBranchByUser(+userId);
    }

    /**
     * 회사의 관리자가 관리하는 모든 지점 조회
     * @param managerPhoneNumber 관리자 전화번호
     */
    @Get('company-manager/:managerPhoneNumber')
    async getBranchesByCompanyManager(
        @Param('managerPhoneNumber') managerPhoneNumber: string,
    ) {
        return await this.branchService.getBranchesByCompanyManager(
            managerPhoneNumber,
        );
    }

    /**
     * 특정 User가 속한 Branch와 관련된 Company 정보를 조회
     * @param userId 사용자 ID
     */
    @Get('user/:userId')
    async getBranchWithCompanyByUser(@Param('userId') userId: number) {
        return await this.branchService.getBranchWithCompanyByUser(+userId);
    }
}
