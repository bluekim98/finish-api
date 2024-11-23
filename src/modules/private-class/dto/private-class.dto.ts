import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePrivateClassDto {
    @IsInt()
    @Min(1)
    instructorId: number;

    @IsInt()
    @Min(1)
    userId: number;

    @Type(() => Date)
    schedule: Date;

    @IsString()
    @IsNotEmpty()
    room: string;

    @IsString()
    @IsNotEmpty()
    type: string; // 개인, 듀엣, 트리플

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdatePrivateClassDto {
    @IsOptional()
    @IsInt()
    instructorId?: number;

    @IsOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    schedule?: Date;

    @IsOptional()
    room?: string;

    @IsOptional()
    type?: string; // 개인, 듀엣, 트리플

    @IsOptional()
    name?: string;
}