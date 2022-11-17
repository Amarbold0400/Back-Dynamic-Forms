/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class QuestionDto {
  @IsInt()
  @IsNotEmpty()
  formId: number;

  @IsInt()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}
