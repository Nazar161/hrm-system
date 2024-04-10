import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVacancyInput } from './dto/inputs/createVacancy.input';

@Injectable()
export class VacancyService {
  constructor(private prisma: PrismaService) {}

  async create(createVacancyInput: CreateVacancyInput, userId: string) {
    const { title, description } = createVacancyInput;
    const vacancy = await this.prisma.vacancy.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return vacancy;
  }

  async findAll(last: number) {
    return await this.prisma.vacancy.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: last,
    });
  }
}
