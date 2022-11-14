/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from 'class-validator';

export class ResultDto {
  @IsInt()
  @IsNotEmpty()
  formId: number;

  @IsInt()
  surveyeeId: number;
}
