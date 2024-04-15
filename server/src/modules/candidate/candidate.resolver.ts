import { Resolver, Query, Mutation, Args, ResolveField, Parent, ID, Int } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/inputs/createCandidate.input';
import { UpdateCandidateInput } from './dto/inputs/updateCandidate.input';
import { ResumeService } from '../resume/resume.service';
import { CurrentUserId } from '../auth/decorators/currentUserId.decorator';

@Resolver(() => Candidate)
export class CandidateResolver {
  constructor(
    private readonly candidateService: CandidateService,
    private resumeService: ResumeService,
  ) {}

  @Mutation(() => Candidate)
  createCandidate(
    @Args('createCandidateInput') createCandidateInput: CreateCandidateInput,
    @CurrentUserId() userId: string,
  ) {
    return this.candidateService.create(createCandidateInput, userId);
  }

  @Query(() => [Candidate], { name: 'candidates' })
  findAll(@CurrentUserId() userId: string, @Args('last', { type: () => Int, nullable: true }) last?: number) {
    return this.candidateService.findAll(userId, last);
  }

  @Query(() => [Candidate], { name: 'availableCandidates' })
  findAllAvailableCandidates(@CurrentUserId() userId: string) {
    return this.candidateService.findAllAvailableCandidates(userId);
  }

  @Query(() => Candidate, { name: 'candidate' })
  findOne(@Args('id', { type: () => ID }) id: string, @CurrentUserId() userId: string) {
    return this.candidateService.findOne(id, userId);
  }

  @Mutation(() => Candidate)
  updateCandidate(@Args('updateCandidateInput') updateCandidateInput: UpdateCandidateInput) {
    return this.candidateService.update(updateCandidateInput.id, updateCandidateInput);
  }

  @Mutation(() => Candidate)
  removeCandidate(@Args('id', { type: () => ID }) id: string) {
    return this.candidateService.remove(id);
  }

  @ResolveField()
  async resumes(@Parent() candidate: Candidate) {
    const { id } = candidate;
    return this.resumeService.findAllByCandidateId(id);
  }
}
