import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVacancyInput } from './dto/inputs/createVacancy.input';

@Injectable()
export class VacancyService {
  constructor(private prisma: PrismaService) {}

  async create(createVacancyInput: CreateVacancyInput, userId: string) {
    const { title, description, maxSalary, minSalary } = createVacancyInput;
    const vacancy = await this.prisma.vacancy.create({
      data: {
        title,
        description,
        minSalary,
        maxSalary,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return vacancy;
  }

  async findAll(userId: string, last: number) {
    return await this.prisma.vacancy.findMany({
      where: {
        createdById: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: last,
    });
  }

  async findOne(id: string, userId: string) {
    return await this.prisma.vacancy.findUnique({
      where: {
        id,
        createdById: userId,
      },
    });
  }
}
