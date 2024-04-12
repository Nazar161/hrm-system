import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApplicationPreview } from '../../application/entities/applicationPreview.entity';

@ObjectType()
export class Vacancy {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [ApplicationPreview], { nullable: 'itemsAndList' })
  applications: ApplicationPreview[];
}
