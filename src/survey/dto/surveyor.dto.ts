/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SurveyorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
