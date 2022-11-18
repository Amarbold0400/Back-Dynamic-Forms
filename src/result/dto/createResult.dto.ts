/* eslint-disable prettier/prettier */
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Answer {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsNumber()
  @IsNotEmpty()
  questionId: number;
}

export class createResultDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  formId: number;

  @IsString()
  @IsNotEmpty()
  surveyeeNick: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Answer)
  answers: Answer[];
}
