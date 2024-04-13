import { graphql } from 'gql.tada';

// TODO: rename SignResponse in api

export const AuthFragment = graphql(`
  fragment AuthResponse on SignResponse {
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
`);
