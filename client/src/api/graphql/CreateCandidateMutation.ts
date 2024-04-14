import { graphql } from 'gql.tada';

export const CreateCandidateMutation = graphql(`
  mutation CreateCandidateMutation($createCandidateInput: CreateCandidateInput!) {
    createCandidate(createCandidateInput: $createCandidateInput) {
      id
      firstName
      lastName
    }
  }
`);
