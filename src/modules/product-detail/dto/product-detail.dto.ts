import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDetailDto {
    @IsInt()
    @Min(1)
    productId: number;

    @IsInt()
    @Min(1)
    userId: number;

    @Type(() => Date)
    expirationDate?: Date; // 상품 이용 기한 (선택적)

    @IsInt()
    usageCount: number; // 상품 이용 횟수

    @IsOptional()
    @IsString()
    paymentInfo?: string; // 결제 정보 (선택적)
}

export class UpdateProductDetailDto {
    @IsOptional()
    expirationDate?: Date;

    @IsOptional()
    usageCount?: number;

    @IsOptional()
    paymentInfo?: string;
}