import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateBranchDto {
    @IsInt()
    @IsNotEmpty()
    companyId: number;

    @IsInt()
    @IsNotEmpty()
    managerId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsDateString()
    openDate: string;
}
