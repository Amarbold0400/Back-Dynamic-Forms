/* eslint-disable prettier/prettier */
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class QuestionOption {
  @IsString()
  @IsNotEmpty()
  optionValue: string;
}

class Question {
  @IsNumber()
  @IsNotEmpty()
  formId: number;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionOption)
  questionOptions?: QuestionOption[];
}

export class updateSurveyDto {
  @IsNumber()
  @IsNotEmpty()
  formId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Question)
  questions?: Question[];
}
