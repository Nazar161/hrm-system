import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ResumeFormat } from './resumeFormat.enum';

@ObjectType()
export class Resume {
  @Field(() => ID)
  id: string;

  @Field()
  resumeTitle: string;

  @Field()
  resumeUrl: string;

  @Field(() => ResumeFormat)
  resumeFormat: ResumeFormat;
}
