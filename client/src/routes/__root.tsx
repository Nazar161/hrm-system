import { useState } from 'react';

import { useMutation } from 'urql';
import { LogoutMutation } from '../api/graphql/auth/LogoutMutation';

import { createRootRouteWithContext, Link, Outlet, useNavigate } from '@tanstack/react-router';

import BurgerButton from '@/components/ui/burgerButton';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';

import useAuth from '../hooks/useAuth';
import { IUserContext, type IAuth } from '../context/AuthProvider';

import { clearStorageTokens } from '../utils/authStore';

const activeProps = {
  style: {
    color: 'rgb(148, 163, 184)',
  },
};

interface MyRouterContext {
  auth: IAuth;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Root() {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const [, logout] = useMutation(LogoutMutation);

  const handleLogout = () => {
    logout({ userId: auth.user.id }).then((result) => {
      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else {
        console.log(result);
        if (result.data?.logout.loggedOut) {
          auth.setUser({} as IUserContext);
          clearStorageTokens();
          navigate({ to: '/login' });
        }
      }
    });
  };

  return (
    <div className="min-h-screen">
      <header className="bg-slate-900 px-4">
        <nav className="border-gray-200 py-2.5 ">
          <div className="mx-auto flex flex-wrap items-center justify-between">
            <Link to="/" className="flex items-center text-white">
              <span className="self-center whitespace-nowrap text-xl font-semibold ">HRM Система</span>
            </Link>
            <div className="flex items-center lg:order-2">
              {!auth.isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
                  >
                    Вход
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 mr-2 rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 lg:px-5 lg:py-2.5"
                  >
                    Регистрация
                  </Link>
                </>
              ) : (
                <>
                  <div className="mr-2 text-white">
                    {auth.user?.lastName[0]}. {auth.user?.firstName}
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 mr-2 rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-slate-800 focus:outline-none focus:ring-4 lg:px-5 lg:py-2.5"
                  >
                    Выйти
                  </Button>
                </>
              )}
              <BurgerButton onClick={() => setMenuVisibility(!menuVisibility)} />
            </div>
            <div
              className={`w-full items-center justify-between lg:order-1 lg:flex lg:w-auto ${menuVisibility ? '' : 'hidden'}`}
            >
              <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
                <li>
                  <Link
                    to="/vacancy"
                    className="block border-b py-2 pl-3 pr-4 text-white lg:border-0 lg:p-0"
                    activeProps={activeProps}
                  >
                    Вакансии
                  </Link>
                </li>
                <li>
                  <Link
                    to="/candidate"
                    className="block border-b py-2 pl-3 pr-4 text-white lg:border-0 lg:p-0"
                    activeProps={activeProps}
                  >
                    Кандидаты
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="px-4">
        <Outlet />
        <Toaster />
      </main>
      <footer className="sticky top-[100vh] mt-5 h-14 bg-slate-900 px-4">
        <div className="text-white">
          <span>HRM Система</span>
          <span> | </span>
          <span>Copyright ©NazaretSarkisian, Inc. 2024.</span>
        </div>
      </footer>
    </div>
  );
}
