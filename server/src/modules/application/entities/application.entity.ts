import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Vacancy } from '../../vacancy/entities/vacancy.entity';
import { Candidate } from '../../candidate/entities/candidate.entity';
import { InterviewStatus } from './enums/interviewStatus.enum';
import { TestTaskStatus } from './enums/testTaskStatus.enum';
import { RefusalReason } from './enums/refusalReason.enum';

@ObjectType()
export class Application {
  @Field(() => ID)
  id: string;

  @Field(() => InterviewStatus, { nullable: true })
  telInterview?: InterviewStatus;

  @Field({ nullable: true })
  telInterviewComment?: string;

  @Field(() => InterviewStatus, { nullable: true })
  hrInterview?: InterviewStatus;

  @Field({ nullable: true })
  hrInterviewComment?: string;

  @Field(() => InterviewStatus, { nullable: true })
  techInterview?: InterviewStatus;

  @Field({ nullable: true })
  techInterviewComment?: string;

  @Field(() => TestTaskStatus, { nullable: true })
  testTask?: TestTaskStatus;

  @Field({ nullable: true })
  testTaskComment?: string;

  @Field({ nullable: true })
  offer?: boolean;

  @Field({ nullable: true })
  offerComment?: string;

  @Field({ nullable: true })
  jobStartComment?: string;

  @Field(() => RefusalReason, { nullable: true })
  refusalReason?: RefusalReason;

  @Field({ nullable: true })
  refusalReasonComment?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Vacancy)
  vacancy: Vacancy;

  @Field(() => Candidate)
  candidate: Candidate;
}
