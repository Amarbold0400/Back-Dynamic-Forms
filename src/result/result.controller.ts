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
import { ResultService } from './result.service';
import { createResultDto } from './dto';
import { JwtGuard } from '../users/guard/jwt.guard';
import { GetSurveyor } from '../users/decorator/get-surveyor.decorator';
import { Surveyor } from '@prisma/client';

@Controller()
export class ResultController {
  constructor(private resultService: ResultService) {}

  @Post('saveResult/:id')
  createResult(
    @Param('id', ParseIntPipe) surveyId: number,
    @Body() dto: createResultDto,
  ) {
    return this.resultService.createResult(surveyId, dto);
  }

  // @Get('survey/:id')
  // getResultsByFormId(
  //   @GetSurveyor('id') userId: number,
  //   @Param('id', ParseIntPipe) surveyId: number,
  // ) {
  //   return this.surveyService.getSurveyById(userId, surveyId);
  // }
}
