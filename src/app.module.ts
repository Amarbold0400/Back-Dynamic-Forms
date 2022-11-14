import { Module } from '@nestjs/common';
import { SurveyModule } from './survey/survey.module';
import { ResultModule } from './result/result.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SurveyModule, ResultModule, PrismaModule],
})
export class AppModule {}
