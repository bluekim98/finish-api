import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassReservationDto {
    @IsInt()
    @Min(1)
    userId: number; // User ID

    @IsInt()
    @Min(1)
    classId: number;

    @IsOptional()
    @IsInt()
    privateClassId?: number; // 선택적

    @Type(() => Date)
    reservationTime: Date;

    @IsString()
    @IsNotEmpty()
    room: string;

    @IsString()
    @IsNotEmpty()
    status: string; // 예약 상태
}

export class UpdateClassReservationDto {
    @IsOptional()
    @IsInt()
    userId?: number; // User ID

    @IsOptional()
    @IsInt()
    classId?: number;

    @IsOptional()
    privateClassId?: number; // 선택적

    @IsOptional()
    reservationTime?: Date;

    @IsOptional()
    room?: string;

    @IsOptional()
    status?: string; // 예약 상태

    @IsOptional()
    statusChangeTime?: Date;
}