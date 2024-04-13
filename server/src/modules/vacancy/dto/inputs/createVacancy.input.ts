import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateVacancyInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @Field(() => Int, { nullable: true })
  minSalary?: number;

  @Field(() => Int, { nullable: true })
  maxSalary?: number;
}
