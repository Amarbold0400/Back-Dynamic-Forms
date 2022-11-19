/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createResultDto } from './dto';

@Injectable()
export class ResultService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async createResult(surveyId: number, dto: createResultDto) {
    const surveyee = await this.prisma.surveyee.create({
      data: {
        name: dto.surveyeeNick,
        email: dto.surveyeeNick + '@gmail.com',
      },
    });

    const create = await this.prisma.result.create({
      data: {
        formId: dto.formId,
        surveyeeId: surveyee.id,
      },
      include: {
        answers: true,
      },
    });

    let result = await this.prisma.result.findFirst({
      where: {
        formId: dto.formId,
        surveyeeId: surveyee.id,
      },
    });

    const update = await this.prisma.result.update({
      where: {
        id: result.id,
      },
      data: {
        answers: {
          deleteMany: {},
          createMany: {
            data: [...dto.answers],
          },
        },
      },
      include: {
        answers: true,
      },
    });

    console.log(update);
  }

  async getResultsByFormId(id: number) {
    const results = await this.prisma.result.findMany({
      where: {
        formId: id,
      },
      include: {
        answers: true,
      },
    });
    return results;
  }

  getAllAnswers(resultId: number) {
    return this.prisma.answer.findMany({
      where: {
        resultId,
      },
    });
  }
}
