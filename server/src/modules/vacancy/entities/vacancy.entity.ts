import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Application } from '../../application/entities/application.entity';

@ObjectType()
export class Vacancy {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [Application], { nullable: 'itemsAndList' })
  applications: Application[];
}
