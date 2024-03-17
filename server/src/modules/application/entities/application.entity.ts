import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Vacancy } from '../../vacancy/entities/vacancy.entity';
import { Candidate } from '../../candidate/entities/candidate.entity';

@ObjectType()
export class Application {
  @Field(() => Vacancy)
  vacancy: Vacancy;

  @Field(() => Candidate)
  candidate: Candidate;
}
