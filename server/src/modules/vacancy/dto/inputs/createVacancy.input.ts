import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
