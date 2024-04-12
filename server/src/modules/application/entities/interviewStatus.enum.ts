import { registerEnumType } from '@nestjs/graphql';

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  NOT_COMPLETED = 'NOT_COMPLETED',
}

registerEnumType(InterviewStatus, {
  name: 'InterviewStatus',
  description: 'The status of an interview.',
});
