import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateApplicationInput {
  @Field(() => ID)
  vacancyId: string;

  @Field(() => ID)
  candidateId: string;
}
