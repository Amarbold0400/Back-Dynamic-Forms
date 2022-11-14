/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { SurveyService } from './survey.service';
import {
  createFormDto,
  SurveyorDto,
  updateFormDto,
  extractUrlDto,
} from './dto';

@Controller()
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Get('allForms')
  allForms() {
    return this.surveyService.allForms();
  }

  @Post('create')
  createForm(@Body() dto: createFormDto) {
    return this.surveyService.createForm(dto);
  }

  @Put('updateForm')
  updateForm(@Body() dto: updateFormDto) {
    return this.surveyService.updateForm(dto);
  }

  @Post('createUser')
  createUser(@Body() dto: SurveyorDto) {
    return this.surveyService.createUser(dto);
  }

  @Post('extractCss')
  extractCss(@Body() dto: extractUrlDto) {
    return this.surveyService.extractCss(dto);
  }

  @Get('testAxios')
  testAxios() {
    return this.surveyService.testAxios();
  }
}
