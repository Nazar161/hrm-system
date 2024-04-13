import { graphql } from 'gql.tada';

export const GetNewTokensMutation = graphql(`
  mutation GetNewTokensMutation {
    getNewTokens {
      accessToken
      refreshToken
      user {
        id
        email
        username
        firstName
        lastName
      }
    }
  }
`);
