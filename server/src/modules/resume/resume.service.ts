import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GcsService } from '../gcs/gcs.service';
import { init } from '@paralleldrive/cuid2';
import { ResumeFormat } from './entities/resumeFormat.enum';

@Injectable()
export class ResumeService {
  private createId: () => string;
  constructor(
    private prisma: PrismaService,
    private readonly gcsService: GcsService,
  ) {
    this.createId = init({
      length: 25,
    });
  }

  findAll() {
    return `This action returns all resume`;
  }

  async findAllByCandidateId(candidateId: string) {
    return await this.prisma.resume.findMany({
      where: {
        candidateId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} resume`;
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }

  async uploadResume(file: Express.Multer.File, candidateId: string) {
    const resumeId = this.createId();

    const fileOriginalName = file.originalname;
    const fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf('.') + 1);
    const customFileName = `${resumeId}.${fileExtension}`;
    const resumeUrl = `https://storage.googleapis.com/hrm-system-378-storage/${customFileName}`;

    await this.gcsService.uploadFile(customFileName, file.buffer);

    const resumeTitle = fileOriginalName.replace(/\s+\./g, '.');

    const resumeFormat: ResumeFormat = resumeTitle.toLowerCase().endsWith('.pdf')
      ? ResumeFormat.PDF
      : ResumeFormat.DOCX;

    const resume = await this.prisma.resume.create({
      data: {
        id: resumeId,
        resumeTitle,
        resumeUrl,
        resumeFormat,
        candidate: {
          connect: {
            id: candidateId,
          },
        },
      },
    });

    return resume;
  }
}
