/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { createFormDto, SurveyorDto, updateFormDto } from './dto';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}
  allForms() {
    return { obj: 'this is the shit ' };
  }

  async createForm(dto: createFormDto) {
    const form = await this.prisma.form.create({
      data: {
        createdBy: 3,
        title: dto.title,
      },
    });

    return form.id;
  }

  async updateForm(dto: updateFormDto) {
    const form = await this.prisma.form.update({
      where: {
        id: parseInt(dto.formId),
      },
      data: {
        title: dto.title,
      },
    });
    return form;
  }

  async createUser(dto: SurveyorDto) {
    const user = await this.prisma.surveyor.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });

    return user;
  }
}
