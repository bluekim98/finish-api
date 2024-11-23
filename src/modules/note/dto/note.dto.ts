import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateNoteDto {
    @IsInt()
    userId: number;

    @IsString()
    @IsNotEmpty()
    content: string; // 메모 내용

    @IsOptional()
    @IsString()
    imageUrl?: string; // 첨부된 사진 URL (선택적)
}

export class UpdateNoteDto {
    @IsOptional()
    @IsString()
    content?: string; // 메모 내용

    @IsOptional()
    @IsString()
    imageUrl?: string; // 첨부된 사진 URL
}