import { graphql } from 'gql.tada';

export const CandidateListQuery = graphql(`
  query CandidateListQuery {
    candidates {
      id
      position
      firstName
      lastName
      email
      phone
    }
  }
`);
