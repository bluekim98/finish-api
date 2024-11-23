import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassDto {
    @IsInt()
    @Min(1)
    instructorId: number;

    @IsInt()
    @Min(1)
    branchId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    maxParticipants: number;

    @IsInt()
    waitlistCapacity: number;

    @IsInt()
    classTypeId: number;

    @Type(() => Date)
    availableTime: Date;

    @Type(() => Date)
    cancelTime: Date;

    @Type(() => Date)
    changeTime: Date;

    @Type(() => Date)
    closeTime: Date;

    @Type(() => Date)
    autoReserveTime: Date;
    
    @IsOptional()
    schedule?: string;
}

export class UpdateClassDto {
    @IsOptional()
    @IsInt()
    instructorId?: number;
    
    @IsOptional()
    @IsInt()
    branchId?: number;
    
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    description?: string;
    
    @IsOptional()
    maxParticipants?: number;
    
    @IsOptional()
    waitlistCapacity?: number;
    
    @IsOptional()
    classTypeId?: number;
    
    @IsOptional()
    availableTime?: Date;
    
    @IsOptional()
    cancelTime?: Date;
    
    @IsOptional()
    changeTime?: Date;
    
    @IsOptional()
    closeTime?: Date;
    
    autoReserveTime?: Date;
    
    schedule?: string;
}