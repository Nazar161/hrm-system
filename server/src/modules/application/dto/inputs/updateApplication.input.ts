import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { InterviewStatus } from '../../entities/enums/interviewStatus.enum';
import { TestTaskStatus } from '../../entities/enums/testTaskStatus.enum';
import { RefusalReason } from '../../entities/enums/refusalReason.enum';

@InputType()
export class UpdateApplicationInput {
  @Field()
  readonly id: string;

  @Field(() => InterviewStatus, { nullable: true })
  telInterview?: InterviewStatus;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  telInterviewComment?: string;

  @Field(() => InterviewStatus, { nullable: true })
  hrInterview?: InterviewStatus;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  hrInterviewComment?: string;

  @Field(() => InterviewStatus, { nullable: true })
  techInterview?: InterviewStatus;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  techInterviewComment?: string;

  @Field(() => TestTaskStatus, { nullable: true })
  testTask?: TestTaskStatus;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  testTaskComment?: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  offer?: boolean;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  offerComment?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  jobStartComment?: string;

  @Field(() => RefusalReason, { nullable: true })
  refusalReason?: RefusalReason;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  refusalReasonComment?: string;
}
