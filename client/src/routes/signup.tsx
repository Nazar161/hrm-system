import { flushSync } from 'react-dom';

import { createFileRoute, useNavigate } from '@tanstack/react-router';

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

import { SignUpMutation } from '../api/graphql/auth/SignUpMutation';
import { AuthFragment } from '../api/graphql/auth/AuthFragment';

export const Route = createFileRoute('/signup')({
  component: SignUp,
});

const FormSchema = z
  .object({
    email: z.string().min(1, { message: requiredMessage }).email('Невалидный адрес электронной почты.'),
    username: z.string().min(5, {
      message: 'Имя пользователя должно содержать не менее 5 символов.',
    }),
    firstName: z.string().min(1, {
      message: requiredMessage,
    }),
    lastName: z.string().min(1, {
      message: requiredMessage,
    }),
    password: z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароль не соответствует',
  });

function SignUp() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [{ fetching }, signUp] = useMutation(SignUpMutation);

  const auth = useAuth();

  const navigate = useNavigate({ from: '/signup' });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    const { email, username, firstName, lastName, password } = formData;
    signUp({
      signUpInput: {
        email,
        username,
        firstName,
        lastName,
        password,
      },
    }).then((result) => {
      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else {
        if (result.data?.signUp) {
          const authResponse = readFragment(AuthFragment, result.data.signUp);

          const { accessToken, refreshToken, user } = authResponse;

          flushSync(() => {
            auth.setUser(user);
          });

          saveAuthTokens({
            token: accessToken,
            refreshToken: refreshToken,
          });
        }

        navigate({ to: '/', replace: true });
        form.reset();
      }
    });
  };

  return (
    <div className="form-container my-6 flex flex-col items-center">
      <Form {...form}>
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Регистрация</h2>
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="Имя пользователя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтверждение пароля</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={fetching}>
            {fetching ? 'Загрузка...;' : 'Зарегистрироваться'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
