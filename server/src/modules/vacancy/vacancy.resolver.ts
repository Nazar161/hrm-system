import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { VacancyService } from './vacancy.service';
import { Vacancy } from './entities/vacancy.entity';
import { CreateVacancyInput } from './dto/inputs/createVacancy.input';
import { CurrentUserId } from '../auth/decorators/currentUserId.decorator';
import { ApplicationService } from '../application/application.service';
import { ApplicationPreview } from '../application/entities/applicationPreview.entity';

@Resolver(() => Vacancy)
export class VacancyResolver {
  constructor(
    private readonly vacancyService: VacancyService,
    private readonly applicationService: ApplicationService,
  ) {}

  @Mutation(() => Vacancy)
  createVacancy(
    @Args('createVacancyInput') createVacancyInput: CreateVacancyInput,
    @CurrentUserId() userId: string,
  ) {
    return this.vacancyService.create(createVacancyInput, userId);
  }

  @Query(() => Vacancy, { name: 'vacancy' })
  findOne(@Args('id', { type: () => ID }) id: string, @CurrentUserId() userId: string) {
    return this.vacancyService.findOne(id, userId);
  }

  @Query(() => [Vacancy], { name: 'vacancies' })
  findAll(@CurrentUserId() userId: string, @Args('last', { type: () => Int, nullable: true }) last?: number) {
    return this.vacancyService.findAll(userId, last);
  }

  @ResolveField()
  async applications(@Parent() vacancy: Vacancy): Promise<ApplicationPreview[]> {
    const { id } = vacancy;
    return this.applicationService.findAllByVacancyId(id);
  }
}
