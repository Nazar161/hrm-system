import { registerEnumType } from '@nestjs/graphql';

export enum TestTaskStatus {
  NOT_ASKED = 'NOT_ASKED',
  COMPLETED = 'COMPLETED',
  NOT_COMPLETED = 'NOT_COMPLETED',
  REFUSAL_TO_COMPLETE = 'REFUSAL_TO_COMPLETE',
}

registerEnumType(TestTaskStatus, {
  name: 'TestTaskStatus',
});
