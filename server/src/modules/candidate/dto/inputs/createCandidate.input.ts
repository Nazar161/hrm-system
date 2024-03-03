import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Sex } from '../../entities/sex.enum';

@InputType()
export class CreateCandidateInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  phone?: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  position: string;

  @Field(() => Sex)
  sex: Sex;

  @IsNotEmpty()
  @Field()
  dateOfBirth: Date;
}
