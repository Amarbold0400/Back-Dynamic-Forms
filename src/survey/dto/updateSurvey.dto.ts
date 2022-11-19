/* eslint-disable prettier/prettier */
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class Style {
  @IsNumber()
  @IsNotEmpty()
  formId: number;

  @IsString()
  themeButtonBackground: string;

  @IsString()
  themeButtonBorderColor: string;

  @IsString()
  themeButtonColor: string;

  @IsString()
  themeFormGroupBackgroundColor: string;

  @IsString()
  themeFormGroupBackgroundHoverColor: string;

  @IsString()
  themeFormGroupBorderColor: string;

  @IsString()
  themeFormGroupBorderHoverColor: string;

  @IsString()
  themeFormGroupBorderStyle: string;

  @IsString()
  themeFormGroupBorderWidth: string;

  @IsString()
  themeGlobalBackgroundColor: string;

  @IsString()
  themeGlobalFontColor: string;

  @IsString()
  themeGlobalFontFamily: string;

  @IsString()
  themeGlobalFontSize: string;

  @IsString()
  themeGlobalLinkColor: string;

  @IsString()
  themeHelpTextColor: string;

  @IsString()
  themeHelpTextFontSize: string;

  @IsString()
  themeHelpTextMarginTop: string;

  @IsString()
  themeInputBorderColor: string;

  @IsString()
  themeInputBorderRadius: string;

  @IsString()
  themeInputFocusBorderColor: string;

  @IsString()
  themeInputHoverBorderColor: string;

  @IsString()
  themeInputShadowColor: string;

  @IsString()
  themeLabelFontSize: string;

  @IsString()
  themeLabelFontWeight: string;

  @IsString()
  themeLabelMarginBottom: string;

  @IsString()
  themePrimaryColor: string;
}

class QuestionOption {
  @IsString()
  @IsNotEmpty()
  text: string;
}

class Question {
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionOption)
  options?: QuestionOption[];
}

export class updateSurveyDto {
  @IsNumber()
  @IsNotEmpty()
  formId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsObject()
  css: Style;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Question)
  questions: Question[];
}
