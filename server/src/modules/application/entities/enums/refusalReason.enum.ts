import { registerEnumType } from '@nestjs/graphql';

export enum RefusalReason {
  CANDIDATE_REFUSAL = 'CANDIDATE_REFUSAL',
  HR_REFUSAL = 'HR_REFUSAL',
  TECH_REFUSAL = 'TECH_REFUSAL',
}

registerEnumType(RefusalReason, {
  name: 'RefusalReason',
});
