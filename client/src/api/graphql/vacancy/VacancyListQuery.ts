import { graphql } from 'gql.tada';

export const VacancyListQuery = graphql(`
  query VacancyListQuery {
    vacancies {
      id
      title
      description
      minSalary
      maxSalary
    }
  }
`);
