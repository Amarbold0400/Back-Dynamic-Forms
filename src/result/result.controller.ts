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

  @UseGuards(JwtGuard)
  @Get('result/:id')
  getResultsByFormId(@Param('id', ParseIntPipe) id: number) {
    return this.resultService.getResultsByFormId(id);
  }

  @UseGuards(JwtGuard)
  @Get('answers/:id')
  getAllAnswers(@Param('id', ParseIntPipe) resultId: number) {
    return this.resultService.getAllAnswers(resultId);
  }
}
