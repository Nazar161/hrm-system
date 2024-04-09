import { graphql } from 'gql.tada';

export const LogoutMutation = graphql(`
  mutation LogoutMutation($userId: String!) {
    logout(userId: $userId) {
      loggedOut
    }
  }
`);
