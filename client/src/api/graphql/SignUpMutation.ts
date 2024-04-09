import { graphql } from 'gql.tada';
import { AuthFragment } from './AuthFragment';

export const SignUpMutation = graphql(
  `
    mutation SignUpMutation($signUpInput: SignUpInput!) {
      signUp(signUpInput: $signUpInput) {
        ...AuthResponse
      }
    }
  `,
  [AuthFragment],
);
