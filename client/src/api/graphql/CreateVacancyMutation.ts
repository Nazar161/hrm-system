import { graphql } from 'gql.tada';

export const CreateVacancyMutation = graphql(`
  mutation CreateVacancyMutation($createVacancyInput: CreateVacancyInput!) {
    createVacancy(createVacancyInput: $createVacancyInput) {
      id
      title
    }
  }
`);
