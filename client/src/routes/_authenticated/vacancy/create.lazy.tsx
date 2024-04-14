import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { useMutation } from 'urql';
import { CreateVacancyMutation } from '../../../api/graphql/CreateVacancyMutation';

import { requiredMessage } from '../../../utils/constants';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export const Route = createLazyFileRoute('/_authenticated/vacancy/create')({
  component: CreateVacancy,
});

const FormSchema = z.object({
  title: z.string().min(1, { message: requiredMessage }),
  description: z.string().min(1, { message: requiredMessage }),
  minSalary: z
    .string()
    .optional()
    .refine((val) => (val ? /^\d+$/.test(val) : true), 'Введите число')
    .refine((val) => (val ? !val.startsWith('0') : true), 'Число не может начинаться с 0'),
  maxSalary: z
    .string()
    .optional()
    .refine((val) => (val ? /^\d+$/.test(val) : true), 'Введите число')
    .refine((val) => (val ? !val.startsWith('0') : true), 'Число не может начинаться с 0'),
});

function CreateVacancy() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      minSalary: '',
      maxSalary: '',
    },
  });

  const { toast, dismiss } = useToast();

  const [{ fetching }, createVacancy] = useMutation(CreateVacancyMutation);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { title, description, minSalary, maxSalary } = data;

    createVacancy({
      createVacancyInput: {
        title,
        description,
        minSalary: minSalary ? parseInt(minSalary) : undefined,
        maxSalary: maxSalary ? parseInt(maxSalary) : undefined,
      },
    }).then((result) => {
      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else if (result.data?.createVacancy) {
        const { id, title } = result.data.createVacancy;

        toast({
          description: (
            <span>
              Вакансия <b>{title}</b> успешно создана
            </span>
          ),
          action: (
            <ToastAction altText="Перейти" onClick={() => dismiss()}>
              <Link to="/vacancy/$id" params={{ id }}>
                Перейти
              </Link>
            </ToastAction>
          ),
          className: 'bg-slate-200',
        });
        form.reset();
      }
    });
  };

  return (
    <div className="mt-5">
      <Form {...form}>
        <h2 className="mb-4 border-b pb-2 text-3xl font-semibold tracking-tight">Форма создания вакансии</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 lg:w-1/3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Backend Разработчик" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea placeholder="Описание вакансии" className="min-h-[160px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <FormLabel>Зарплатная вилка</FormLabel>
            <div className="mt-2 flex items-center">
              <FormField
                control={form.control}
                name="minSalary"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormControl>
                        <Input placeholder="От" {...field} />
                      </FormControl>
                      <span className="ml-2">-</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxSalary"
                render={({ field }) => (
                  <FormItem className="ml-2">
                    <FormControl>
                      <Input placeholder="До" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">{fetching ? 'Загрузка...' : 'Создать'}</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateVacancy;
