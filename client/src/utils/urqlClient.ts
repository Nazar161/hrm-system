import { Client, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { graphql } from 'gql.tada';
import { getRefreshToken, getToken, saveAuthTokens, clearStorageTokens } from './authStore';

const getNewTokens = graphql(`
  mutation GetNewTokens {
    getNewTokens {
      accessToken
      refreshToken
    }
  }
`);

const auth = authExchange(async (utils) => {
  return {
    addAuthToOperation(operation) {
      const token = getToken();
      const refreshToken = getRefreshToken();

      if (
        refreshToken &&
        operation.kind === 'mutation' &&
        operation.query.definitions.some((definition) => {
          return (
            definition.kind === 'OperationDefinition' &&
            definition.selectionSet.selections.some(
              (node) => node.kind === 'Field' && node.name.value === 'getNewTokens',
            )
          );
        })
      ) {
        return utils.appendHeaders(operation, { Authorization: `Bearer ${refreshToken}` });
      }

      return token ? utils.appendHeaders(operation, { Authorization: `Bearer ${token}` }) : operation;
    },
    didAuthError(error) {
      return error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHENTICATED');
    },
    async refreshAuth() {
      let token = getToken();
      let refreshToken = getRefreshToken();
      if (refreshToken) {
        const result = await utils.mutate(
          getNewTokens,
          {},
          {
            fetchOptions: {
              headers: { Authorization: `Bearer ${refreshToken}` },
            },
          },
        );

        if (result.data?.getNewTokens) {
          token = result.data.getNewTokens.accessToken;
          refreshToken = result.data.getNewTokens.refreshToken;
          saveAuthTokens({ token, refreshToken });
          return;
        }
      }

      clearStorageTokens();
      window.location.assign('/login');
    },
  };
});

const urqlClient = new Client({
  url: 'http://localhost:5222/api/graphql',
  exchanges: [cacheExchange, auth, fetchExchange],
});

export default urqlClient;
