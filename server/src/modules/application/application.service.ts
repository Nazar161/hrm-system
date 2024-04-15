import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationInput } from './dto/inputs/createApplication.input';
import { UpdateApplicationInput } from './dto/inputs/updateApplication.input';
import { ApplicationPreview } from './entities/applicationPreview.entity';
import { last } from 'lodash';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(createApplicationInput: CreateApplicationInput, userId: string) {
    const { vacancyId, candidateId } = createApplicationInput;

    const application = await this.prisma.application.create({
      data: {
        vacancy: {
          connect: { id: vacancyId },
        },
        candidate: {
          connect: { id: candidateId },
        },
        createdBy: {
          connect: { id: userId },
        },
      },
    });

    return application && { id: application.id, isSuccess: true };
  }

  async findOne(id: string, userId: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id,
        createdById: userId,
      },
      include: {
        vacancy: true,
        candidate: true,
      },
    });

    return application;
  }

  async findAll(userId: string, last: number) {
    const applications = await this.prisma.application.findMany({
      where: {
        createdById: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        vacancy: true,
        candidate: true,
      },
      take: last,
    });

    return applications;
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

  async findAllByVacancyId(vacancyId: string) {
    const rawApplications = await this.prisma.application.findMany({
      where: {
        vacancyId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        candidate: { select: { id: true, firstName: true, lastName: true, position: true } },
        vacancy: { select: { id: true, title: true } },
      },
    });

    return this.handleRawApplications(rawApplications);
  }

  handleRawApplications(rawApplications: RawApplication[]): ApplicationPreview[] {
    const applications = rawApplications.map((rawApplication) => {
      const {
        id,
        candidate: { id: candidateId, firstName, lastName, position },
        vacancy: { id: vacancyId, title },
      } = rawApplication;

      return {
        id,
        candidateId,
        candidateName: `${firstName} ${lastName}`,
        candidatePosition: position,
        vacancyId,
        vacancyTitle: title,
      };
    });

    return applications;
  }
}

type RawApplication = {
  id: string;
  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
  };
  vacancy: {
    id: string;
    title: string;
  };
};
