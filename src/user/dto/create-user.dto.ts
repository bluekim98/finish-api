import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly phoneNumber: string;

    @IsString()
    @MinLength(8)
    readonly password: string;
}