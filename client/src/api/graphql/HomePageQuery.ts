import { graphql } from 'gql.tada';

export const HomePageQuery = graphql(`
  query homePageQuery($last: Int) {
    vacancies(last: $last) {
      id
      title
      description
      minSalary
      maxSalary
    }
    candidates(last: $last) {
      id
      firstName
      lastName
      position
      email
      phone
    }
    applications(last: $last) {
      id
      vacancy {
        id
        title
        minSalary
        maxSalary
      }
      candidate {
        id
        firstName
        lastName
        position
      }
    }
  }
`);
