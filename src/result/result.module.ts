import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  imports: [HttpModule],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
