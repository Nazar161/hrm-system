import { createFileRoute, redirect } from '@tanstack/react-router';

import { getRefreshToken, saveAuthTokens } from '../utils/authStore';
import urqlClient from '../utils/urqlClient';

import { GetNewTokensMutation } from '../api/graphql/GetNewTokensMutation';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    if (!!getRefreshToken() && Object.keys(context.auth.user).length === 0) {
      const result = await urqlClient.mutation(GetNewTokensMutation, {});

      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else if (result.data?.getNewTokens) {
        const { accessToken, refreshToken, user } = result.data.getNewTokens;

        saveAuthTokens({
          token: accessToken,
          refreshToken: refreshToken,
        });

        context.auth.setUser(user);
      }
    } else if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
