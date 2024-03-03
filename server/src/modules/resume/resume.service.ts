import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResumeService {
  constructor(private prisma: PrismaService) {}

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
}
