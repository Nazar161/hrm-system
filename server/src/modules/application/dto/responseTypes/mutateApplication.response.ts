import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutateApplicationResponse {
  @Field(() => ID)
  id: string;

  @Field()
  isSuccess: boolean;
}
