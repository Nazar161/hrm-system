import { graphql } from 'gql.tada';
import { AuthFragment } from './AuthFragment';

export const SignInMutation = graphql(
  `
    mutation SignInMutation($signInInput: SignInInput!) {
      signIn(signInInput: $signInInput) {
        ...AuthResponse
      }
    }
  `,
  [AuthFragment],
);
