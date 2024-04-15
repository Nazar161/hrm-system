import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { Application } from './entities/application.entity';
import { CreateApplicationInput } from './dto/inputs/createApplication.input';
import { MutateApplicationResponse } from './dto/responseTypes/mutateApplication.response';
import { UpdateApplicationInput } from './dto/inputs/updateApplication.input';
import { CurrentUserId } from '../auth/decorators/currentUserId.decorator';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}

  @Mutation(() => MutateApplicationResponse)
  async createApplication(
    @Args('createApplicationInput') createApplicationInput: CreateApplicationInput,
    @CurrentUserId() userId: string,
  ) : Promise<MutateApplicationResponse> {
    return this.applicationService.create(createApplicationInput, userId);
  }

  @Query(() => Application, { name: 'application' })
  async getApplication(@Args('id', { type: () => ID }) id: string, @CurrentUserId() userId: string) {
    return this.applicationService.findOne(id, userId);
  }

  @Query(() => [Application], { name: 'applications' })
  async getPreviewApplications(@CurrentUserId() userId: string, @Args('last', { type: () => Int, nullable: true }) last?: number) {
    return this.applicationService.findAll(userId, last);
  }

  @Mutation(() => Application)
  async updateApplication(@Args('updateApplicationInput') updateApplicationInput: UpdateApplicationInput) {
    return this.applicationService.update(updateApplicationInput);
  }
}
