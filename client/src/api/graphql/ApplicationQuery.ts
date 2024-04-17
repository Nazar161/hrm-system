import { graphql } from 'gql.tada';

export const ApplicationQuery = graphql(`
  query ApplicationQuery($applicationId: ID!) {
    application(id: $applicationId) {
      id
      telInterview
      telInterviewComment
      hrInterview
      hrInterviewComment
      techInterview
      techInterviewComment
      testTask
      testTaskComment
      offer
      offerComment
      jobStartComment
      refusalReason
      refusalReasonComment
      candidate {
        id
        firstName
        lastName
      }
      vacancy {
        id
        title
        minSalary
        maxSalary
      }
    }
  }
`);
