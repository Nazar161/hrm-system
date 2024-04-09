import { flushSync } from 'react-dom';

import { createFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router';

import { useMutation } from 'urql';
import { readFragment } from 'gql.tada';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/passwordInput';
import { Button } from '@/components/ui/button';

import { saveAuthTokens } from '../utils/authStore';
import { requiredMessage } from '../utils/constants';

import useAuth from '../hooks/useAuth';

import { SignInMutation } from '../api/graphql/SignInMutation';
import { AuthFragment } from '../api/graphql/AuthFragment';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch('/'),
  }),
  component: Login,
});

const FormSchema = z.object({
  email: z.string().min(1, { message: requiredMessage }).email('Невалидный адрес электронной почты.'),
  password: z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов.' }),
});

const routeApi = getRouteApi('/login');

function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const auth = useAuth();

  const navigate = useNavigate();
  const { redirect } = routeApi.useSearch();

  const [{ fetching }, signIn] = useMutation(SignInMutation);

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    const { email, password } = formData;
    signIn({
      signInInput: {
        email,
        password,
      },
    }).then((result) => {
      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else {
        if (result.data?.signIn) {
          const authResponse = readFragment(AuthFragment, result.data.signIn);

          const { accessToken, refreshToken, user } = authResponse;

          flushSync(() => {
            auth.setUser(user);
          });

          saveAuthTokens({
            token: accessToken,
            refreshToken: refreshToken,
          });
        }
      }

      navigate({ to: redirect ?? '/' });
      form.reset();
    });
  };

  return (
    <div className="form-container my-6 flex flex-col items-center">
      <Form {...form}>
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Вход</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 lg:w-1/3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Электронная почта</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.ru" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={fetching}>
            {fetching ? 'Загрузка...' : 'Войти'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
