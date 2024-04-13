import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApplicationPreview } from '../../application/entities/applicationPreview.entity';

@ObjectType()
export class Vacancy {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int, { nullable: true })
  minSalary?: number;

  @Field(() => Int, { nullable: true })
  maxSalary?: number;

  @Field(() => [ApplicationPreview], { nullable: 'itemsAndList' })
  applications: ApplicationPreview[];
}
