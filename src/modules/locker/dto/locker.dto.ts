import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateLockerDto {
    @IsInt()
    @Min(1)
    branchId: number;

    @IsString()
    @IsNotEmpty()
    lockerName: string; // 락커 이름 또는 번호

    @IsBoolean()
    isInUse: boolean; // 현재 사용 중인지 여부

    @IsOptional()
    @IsInt()
    userId?: number; // 사용 중인 회원 ID (선택적)
}

export class UpdateLockerDto {
    @IsOptional()
    @IsString()
    lockerName?: string;

    @IsOptional()
    @IsBoolean()
    isInUse?: boolean;

    @IsOptional()
    userId?: number;
}