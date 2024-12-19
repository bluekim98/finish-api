import { IsString, IsNotEmpty, IsDateString, Length } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    address: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    managerName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    managerPhoneNumber: string;

    @IsDateString()
    openDate: Date;
}
