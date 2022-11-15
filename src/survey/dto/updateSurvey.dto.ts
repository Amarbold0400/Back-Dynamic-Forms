/* eslint-disable prettier/prettier */
import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';

export class updateSurveyDto {
  @IsString()
  @IsNotEmpty()
  formId: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
