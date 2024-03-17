import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Sex } from './sex.enum';
import { Resume } from '../../resume/entities/resume.entity';
import { Application } from '../../application/entities/application.entity';

@ObjectType()
export class Candidate {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  email: string;

  @Field()
  position: string;

  @Field(() => Sex)
  sex: Sex;

  @Field()
  dateOfBirth: Date;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => [Resume], { nullable: 'itemsAndList' })
  resumes: Resume[];

  @Field(() => [Application], { nullable: 'itemsAndList' })
  applications: Application[];
}
