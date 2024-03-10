import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeResolver } from './resume.resolver';
import { ResumeController } from './resume.controller';
import { GcsService } from '../gcs/gcs.service';

@Module({
  controllers: [ResumeController],
  providers: [ResumeResolver, ResumeService, GcsService],
  exports: [ResumeService],
})
export class ResumeModule {}
