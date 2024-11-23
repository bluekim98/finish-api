import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsInt()
    @Min(1)
    branchId: number;

    @IsString()
    @IsNotEmpty()
    productType: string; // 판매 상품 또는 대여 상품 유형

    @IsString()
    @IsNotEmpty()
    name: string; // 상품 이름

    @IsDecimal()
    price: number; // 상품 가격

    @IsInt()
    rewardPoints: number; // 구매 시 적립되는 포인트

    @Type(() => Date)
    expirationDate?: Date; // 상품 사용 기한 (선택적)

    @IsInt()
    availableCount: number; // 이용 가능 횟수
}

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    productType?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    rewardPoints?: number;

    @IsOptional()
    expirationDate?: Date;

    @IsOptional()
    availableCount?: number;
}