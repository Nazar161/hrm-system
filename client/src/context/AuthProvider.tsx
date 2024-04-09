import React, { createContext, useState } from 'react';
type Props = {
  children: React.ReactNode;
};

export interface IUserContext {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface IAuth {
  isAuthenticated: boolean;
  user: IUserContext;
  setUser: (user: IUserContext) => void;
}

export const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUserContext>({} as IUserContext);
  let isAuthenticated = Object.keys(user).length > 0;

  return <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>{children}</AuthContext.Provider>;
};
