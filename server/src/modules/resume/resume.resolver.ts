import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResumeService } from './resume.service';
import { Resume } from './entities/resume.entity';

@Resolver(() => Resume)
export class ResumeResolver {
  constructor(private readonly resumeService: ResumeService) {}

  @Query(() => [Resume], { name: 'resume' })
  findAll() {
    return this.resumeService.findAll();
  }

  @Query(() => Resume, { name: 'resume' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.resumeService.findOne(id);
  }

  @Mutation(() => Resume)
  removeResume(@Args('id', { type: () => Int }) id: number) {
    return this.resumeService.remove(id);
  }
}
