import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/inputs/createCandidate.input';
import { UpdateCandidateInput } from './dto/inputs/updateCandidate.input';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async create(createCandidateInput: CreateCandidateInput, userId: string) {
    try {
      const { firstName, lastName, phone, email, position, sex, dateOfBirth } = createCandidateInput;
      const candidate = await this.prisma.candidate.create({
        data: {
          firstName,
          lastName,
          phone,
          email,
          position,
          sex: sex,
          dateOfBirth,
          createdBy: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return candidate;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('A Candidate with such an email already exists');
      }
    }
  }

  async findAll(userId: string, last: number) {
    return await this.prisma.candidate.findMany({
      where: {
        createdById: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: last,
    });
  }

  async findAllAvailableCandidates(userId: string) {
    return await this.prisma.candidate.findMany({
      where: {
        createdById: userId,
        applications: { none: {} },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: {
        id,
        createdById: userId,
      },
    });

    return candidate;
  }

  update(id: string, updateCandidateInput: UpdateCandidateInput) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: string) {
    return `This action removes a #${id} candidate`;
  }
}
