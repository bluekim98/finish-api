import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsageHistoryDto {
    @IsInt()
    userId: number;

    @IsInt()
    classId: number;

    @Type(() => Date)
    reservationDate: Date; // 이용 날짜

    @IsString()
    @IsNotEmpty()
    instructorName: string; // 이용 강사 이름

    @IsString()
    @IsNotEmpty()
    status: string; // 이용 상태

    @IsOptional()
    @Type(() => Date)
    statusChangeTime?: Date; // 상태 변경 시간 (선택적)

    @IsString()
    @IsNotEmpty()
    modifiedBy: string; // 상태 변경 담당자
}

export class UpdateUsageHistoryDto {
    @IsOptional()
    reservationDate?: Date;

    @IsOptional()
    instructorName?: string;

    @IsOptional()
    status?: string;

    @IsOptional()
    statusChangeTime?: Date;

    @IsOptional()
    modifiedBy?: string;
}