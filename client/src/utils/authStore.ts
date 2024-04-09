const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';

interface AuthTokens {
  token: string;
  refreshToken: string;
}

export const saveAuthTokens = ({ token, refreshToken }: AuthTokens) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearStorageTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
