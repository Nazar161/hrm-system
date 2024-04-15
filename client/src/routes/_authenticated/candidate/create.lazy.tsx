import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { useMutation } from 'urql';
import { CreateCandidateMutation } from '../../../api/graphql/candidate/CreateCandidateMutation';

import { requiredMessage } from '../../../utils/constants';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MaskInput } from '@/components/ui/maskInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';

import { cn } from '../../../lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

export const Route = createLazyFileRoute('/_authenticated/candidate/create')({
  component: CreateCandidate,
});

const FormSchema = z.object({
  firstName: z.string().min(1, { message: requiredMessage }),
  lastName: z.string().min(1, { message: requiredMessage }),
  position: z.string().min(1, { message: requiredMessage }),
  email: z.string().min(1, { message: requiredMessage }).email('Невалидный адрес электронной почты.'),
  phone: z.string().optional(),
  sex: z.string().min(1, { message: requiredMessage }),
  dateOfBirth: z.date({ required_error: requiredMessage }),
});

type sexType = 'MALE' | 'FEMALE' | 'UNKNOWN';

function CreateCandidate() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      position: '',
      email: '',
      phone: '',
      sex: '',
    },
  });

  const { toast, dismiss } = useToast();

  const [{ fetching }, createCandidate] = useMutation(CreateCandidateMutation);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { firstName, lastName, position, email, phone, sex, dateOfBirth } = data;

    createCandidate({
      createCandidateInput: {
        firstName,
        lastName,
        position,
        email,
        phone: phone?.replace(/[^\d]/g, ''),
        sex: sex as sexType,
        dateOfBirth: dateOfBirth as never,
      },
    }).then((result) => {
      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else if (result.data?.createCandidate) {
        const { id, firstName, lastName } = result.data.createCandidate;
        toast({
          description: (
            <span>
              Кандидат{' '}
              <b>
                {firstName} {lastName[0]}.
              </b>{' '}
              успешно добавлен.
            </span>
          ),
          action: (
            <ToastAction altText="Перейти" onClick={() => dismiss()}>
              <Link to="/candidate/$id" params={{ id }}>
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
        <h2 className="mb-4 border-b pb-2 text-3xl font-semibold tracking-tight">
          Форма добавления кандидата
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 lg:w-1/3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Иван" {...field} />
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
                  <Input placeholder="Иванов" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Должность</FormLabel>
                <FormControl>
                  <Input placeholder="Frontend разработчик" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                  <MaskInput placeholder="" mask="+7 (999) 999-99-99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пол</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите пол" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FEMALE">Женский</SelectItem>
                    <SelectItem value="MALE">Мужской</SelectItem>
                    <SelectItem value="UNKNOWN">Неизвестно</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата рождения</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ru })
                        ) : (
                          <span>Выберите дату рождения</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1960}
                      toYear={2024}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{fetching ? 'Загрузка...' : 'Создать'}</Button>
        </form>
      </Form>
    </div>
  );
}
