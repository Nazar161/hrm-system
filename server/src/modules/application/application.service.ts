import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationInput } from './dto/inputs/createApplication.input';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(createApplicationInput: CreateApplicationInput) {
    const { vacancyId, candidateId } = createApplicationInput;

    const application = await this.prisma.application.create({
      data: {
        vacancy: {
          connect: { id: vacancyId },
        },
        candidate: {
          connect: { id: candidateId },
        },
      },
    });

    return application ? { isSuccess: true } : { isSuccess: false };
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
      },
      include: {
        vacancy: true,
        candidate: true,
      },
    });

    return application;
  }
}
