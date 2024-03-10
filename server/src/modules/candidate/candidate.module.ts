import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateResolver } from './candidate.resolver';
import { ResumeService } from '../resume/resume.service';
import { GcsService } from '../gcs/gcs.service';

@Module({
  providers: [CandidateResolver, CandidateService, ResumeService, GcsService],
})
export class CandidateModule {}
