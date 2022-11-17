/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class updateSurveyDto {
  @IsNumber()
  @IsNotEmpty()
  formId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
