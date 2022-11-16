/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { createSurveyDto, updateSurveyDto, extractUrlDto } from './dto';
import { JwtGuard } from '../users/guard/jwt.guard';
import { GetSurveyor } from '../users/decorator/get-surveyor.decorator';

@UseGuards(JwtGuard)
@Controller()
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Get('allSurveys')
  getAllSurveys(@GetSurveyor('id') userId: number) {
    return this.surveyService.getAllSurveys(userId);
  }

  @Get('survey/:id')
  getSurveyById(
    @GetSurveyor('id') userId: number,
    @Param('id', ParseIntPipe) surveyId: number,
  ) {
    return this.surveyService.getSurveyById(userId, surveyId);
  }

  @Post('create')
  createSurvey(
    @GetSurveyor('id') userId: number,
    @Body() dto: createSurveyDto,
  ) {
    return this.surveyService.createSurvey(userId, dto);
  }

  @Put('survey/:id')
  updateSurveyById(
    @GetSurveyor('id') userId: number,
    @Body() dto: updateSurveyDto,
  ) {
    return this.surveyService.updateSurveyById(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('survey/:id')
  deleteSurveyById(
    @GetSurveyor('id') userId: number,
    @Param('id', ParseIntPipe) surveyId: number,
  ) {
    return this.surveyService.deleteSurveyById(userId, surveyId);
  }

  @Post('extractCss')
  extractCss(@Body() dto: extractUrlDto) {
    return this.surveyService.extractCss(dto);
  }
}
