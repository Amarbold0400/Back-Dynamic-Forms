/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto';
import { Surveyor } from '@prisma/client';
import { JwtGuard } from './guard';
import { GetSurveyor } from './decorator';

@Controller()
export class UsersController {
  constructor(private surveyService: UsersService) {}

  @Post('signup')
  signUp(@Body() dto: UsersDto) {
    return this.surveyService.signUp(dto);
  }

  @Post('login')
  logIn(@Body() dto: UsersDto) {
    return this.surveyService.logIn(dto);
  }

  @UseGuards(JwtGuard)
  @Get('getSurveyor')
  getSurveyor(@GetSurveyor() surveyor: Surveyor) {
    return surveyor;
  }
}
