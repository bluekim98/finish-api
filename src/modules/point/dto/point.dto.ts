import { IsString, IsNotEmpty, IsOptional, IsDecimal, IsInt } from 'class-validator';

export class CreatePointDto {
    @IsInt()
    userId: number;

    @IsDecimal()
    amount: number; // 포인트 금액

    @IsString()
    @IsNotEmpty()
    type: string; // 구분 (적립, 차감, 소멸)

    @IsString()
    @IsNotEmpty()
    category: string; // 분류 (발급, 변경 등)

    @IsOptional()
    @IsString()
    reason?: string; // 포인트 수정 이유 (선택적)
}

export class UpdatePointDto {
    @IsOptional()
    amount?: number;

    @IsOptional()
    type?: string;

    @IsOptional()
    category?: string;

    @IsOptional()
    reason?: string;
}