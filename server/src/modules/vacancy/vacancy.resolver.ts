import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VacancyService } from './vacancy.service';
import { Vacancy } from './entities/vacancy.entity';
import { CreateVacancyInput } from './dto/inputs/createVacancy.input';
import { CurrentUserId } from '../auth/decorators/currentUserId.decorator';

@Resolver(() => Vacancy)
export class VacancyResolver {
  constructor(private readonly vacancyService: VacancyService) {}

  @Mutation(() => Vacancy)
  createVacancy(
    @Args('createVacancyInput') createVacancyInput: CreateVacancyInput,
    @CurrentUserId() userId: string,
  ) {
    return this.vacancyService.create(createVacancyInput, userId);
  }

  @Query(() => [Vacancy], { name: 'vacancies' })
  findAll() {
    return this.vacancyService.findAll();
  }
}
