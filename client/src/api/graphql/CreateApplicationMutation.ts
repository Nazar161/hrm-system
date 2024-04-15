import { graphql } from 'gql.tada';

export const CreateApplicationMutation = graphql(`
  mutation CreateApplicationMutation($createApplicationInput: CreateApplicationInput!) {
    createApplication(createApplicationInput: $createApplicationInput) {
      id
      isSuccess
    }
  }
`);
