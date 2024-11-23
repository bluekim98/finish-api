import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClassTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateClassTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}