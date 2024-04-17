import { graphql } from 'gql.tada';

export const UpdateApplicationMutation = graphql(`
  mutation UpdateApplicationMutation($updateApplicationInput: UpdateApplicationInput!) {
    updateApplication(updateApplicationInput: $updateApplicationInput) {
      id
    }
  }
`);
