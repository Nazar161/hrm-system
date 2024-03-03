import { CreateCandidateInput } from './createCandidate.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCandidateInput extends PartialType(CreateCandidateInput) {
  @Field(() => ID)
  id: string;
}
