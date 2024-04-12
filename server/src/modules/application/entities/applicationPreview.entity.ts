import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApplicationPreview {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  candidateId: string;

  @Field()
  candidateName: string;

  @Field()
  candidatePosition: string;
}
