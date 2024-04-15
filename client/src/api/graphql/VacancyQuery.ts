import { graphql } from 'gql.tada';

export const VacancyQuery = graphql(`
  query Vacancy($vacancyId: ID!) {
    vacancy(id: $vacancyId) {
      id
      title
      description
      minSalary
      maxSalary
      applications {
        id
        candidateId
        candidateName
        candidatePosition
        vacancyId
        vacancyTitle
      }
    }
    availableCandidates {
      id
      firstName
      lastName
      position
    }
  }
`);
