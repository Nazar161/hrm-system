import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationInput } from './dto/inputs/createApplication.input';
import { UpdateApplicationInput } from './dto/inputs/updateApplication.input';

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

  async update(updateApplicationInput: UpdateApplicationInput) {
    const { id } = updateApplicationInput;
    const application = await this.prisma.application.update({
      where: { id },

      data: { updatedAt: new Date(), ...updateApplicationInput },
    });

    if (!application) {
      throw new BadRequestException('Something went wrong!');
    }

    return application;
  }
}
