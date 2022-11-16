/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class createSurveyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}
