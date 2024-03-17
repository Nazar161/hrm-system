import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVacancyInput } from './dto/inputs/createVacancy.input';

@Injectable()
export class VacancyService {
  constructor(private prisma: PrismaService) {}

  async create(createVacancyInput: CreateVacancyInput) {
    const { title, description } = createVacancyInput;
    const vacancy = await this.prisma.vacancy.create({
      data: {
        title,
        description,
      },
    });

    return vacancy;
  }

  async findAll() {
    return await this.prisma.vacancy.findMany();
  }
}
