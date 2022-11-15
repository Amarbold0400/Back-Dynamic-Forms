/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class createSurveyDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
