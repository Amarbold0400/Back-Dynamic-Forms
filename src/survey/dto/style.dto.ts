/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class StyleDto {
  @IsInt()
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
