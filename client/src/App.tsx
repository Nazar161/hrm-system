import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { Provider } from 'urql';
import urqlClient from './utils/urqlClient';

import { AuthProvider } from './context/AuthProvider';
import useAuth from './hooks/useAuth';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <Provider value={urqlClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </Provider>
  );
}

export default App;
