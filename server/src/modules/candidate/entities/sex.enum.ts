import { registerEnumType } from '@nestjs/graphql';

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(Sex, {
  name: 'Sex',
});
