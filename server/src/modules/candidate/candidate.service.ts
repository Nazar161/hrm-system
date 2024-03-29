import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/inputs/createCandidate.input';
import { UpdateCandidateInput } from './dto/inputs/updateCandidate.input';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}
  async create(createCandidateInput: CreateCandidateInput) {
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
        },
      });

      return candidate;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('A Candidate with such an email already exists');
      }
    }
  }

  findAll() {
    return `This action returns all candidate`;
  }

  async findOne(id: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: {
        id,
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
