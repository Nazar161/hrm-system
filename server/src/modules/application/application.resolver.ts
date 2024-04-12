import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { Application } from './entities/application.entity';
import { CreateApplicationInput } from './dto/inputs/createApplication.input';
import { MutateApplicationResponse } from './dto/responseTypes/mutateApplication.response';
import { UpdateApplicationInput } from './dto/inputs/updateApplication.input';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}

  @Mutation(() => MutateApplicationResponse)
  async createApplication(@Args('createApplicationInput') createApplicationInput: CreateApplicationInput) {
    return this.applicationService.create(createApplicationInput);
  }

  @Query(() => Application, { name: 'application' })
  async getApplication(@Args('id', { type: () => ID }) id: string) {
    return this.applicationService.findOne(id);
  }

  @Mutation(() => Application)
  async updateApplication(@Args('updateApplicationInput') updateApplicationInput: UpdateApplicationInput) {
    return this.applicationService.update(updateApplicationInput);
  }
}
