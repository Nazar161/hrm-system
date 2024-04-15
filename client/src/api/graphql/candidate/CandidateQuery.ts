import { graphql } from 'gql.tada';

export const CandidateQuery = graphql(`
  query Candidate($candidateId: ID!) {
    candidate(id: $candidateId) {
      id
      firstName
      lastName
      phone
      email
      position
      sex
      dateOfBirth
      resumes {
        id
        resumeTitle
        resumeUrl
      }
    }
  }
`);
