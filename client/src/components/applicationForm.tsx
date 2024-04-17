import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type FormSchemaType = z.infer<typeof FormSchema>;
interface IApplicationForm extends FormSchemaType {
  onSubmit: SubmitHandler<FormSchemaType>;
}

const FormSchema = z.object({
  telInterview: z.string().optional(),
  telInterviewComment: z.string().optional(),
  hrInterview: z.string().optional(),
  hrInterviewComment: z.string().optional(),
  techInterview: z.string().optional(),
  techInterviewComment: z.string().optional(),
  testTask: z.string().optional(),
  testTaskComment: z.string().optional(),
  offer: z.enum(['true', 'false']).optional(),
  offerComment: z.string().optional(),
  jobStartComment: z.string().optional(),
  refusalReason: z.string().optional(),
  refusalReasonComment: z.string().optional(),
});

const ApplicationForm = ({
  telInterview,
  telInterviewComment,
  hrInterview,
  hrInterviewComment,
  techInterview,
  techInterviewComment,
  testTask,
  testTaskComment,
  offer,
  offerComment,
  jobStartComment,
  refusalReason,
  refusalReasonComment,
  onSubmit,
}: IApplicationForm) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      telInterview: telInterview,
      telInterviewComment: telInterviewComment,
      hrInterview: hrInterview,
      hrInterviewComment: hrInterviewComment,
      techInterview: techInterview,
      techInterviewComment: techInterviewComment,
      testTask: testTask,
      testTaskComment: testTaskComment,
      offer: offer,
      offerComment: offerComment,
      jobStartComment: jobStartComment,
      refusalReason: refusalReason,
      refusalReasonComment: refusalReasonComment,
    },
  });

  form.watch('offer');

  const resetSelectedOption = (field: keyof FormSchemaType) => {
    form.resetField(field);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="telInterview"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="rounded-md bg-slate-300 p-1 text-lg font-bold">
                  Телефонное интервью
                </FormLabel>
                <div className="flex items-center justify-between gap-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Не выбрано" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SCHEDULED">Запланировано</SelectItem>
                      <SelectItem value="COMPLETED">Состоялось</SelectItem>
                      <SelectItem value="NOT_COMPLETED">Не состоялось</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="reset" onClick={() => resetSelectedOption('telInterview')}>
                    сбросить
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telInterviewComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарии</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Комментарии к телефонному интервью"
                    className="min-h-[50px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hrInterview"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="rounded-md bg-slate-300 p-1 text-lg font-bold">
                  Собеседование с HR
                </FormLabel>
                <div className="flex items-center justify-between gap-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Не выбрано" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SCHEDULED">Запланировано</SelectItem>
                      <SelectItem value="COMPLETED">Состоялось</SelectItem>
                      <SelectItem value="NOT_COMPLETED">Не состоялось</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="reset" onClick={() => resetSelectedOption('hrInterview')}>
                    сбросить
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hrInterviewComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарии</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Комментарии к собеседованию с HR"
                    className="min-h-[50px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="techInterview"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="rounded-md bg-slate-300 p-1 text-lg font-bold">
                  Техническое собеседование
                </FormLabel>
                <div className="flex items-center justify-between gap-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Не выбрано" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SCHEDULED">Запланировано</SelectItem>
                      <SelectItem value="COMPLETED">Состоялось</SelectItem>
                      <SelectItem value="NOT_COMPLETED">Не состоялось</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="reset" onClick={() => resetSelectedOption('techInterview')}>
                    сбросить
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="techInterviewComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарии</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Комментарии к техническому собеседованию"
                    className="min-h-[50px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="testTask"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="rounded-md bg-slate-300 p-1 text-lg font-bold">
                  Тестовое задание
                </FormLabel>
                <div className="flex items-center justify-between gap-2">
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Не выбрано" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NOT_ASKED">Не предложено</SelectItem>
                      <SelectItem value="COMPLETED">Выполнено</SelectItem>
                      <SelectItem value="NOT_COMPLETED">Не выполнено</SelectItem>
                      <SelectItem value="REFUSAL_TO_COMPLETE">Отказ от выполнения</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="reset" onClick={() => resetSelectedOption('testTask')}>
                    сбросить
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="testTaskComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарии</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Комментарии к тестовому заданию"
                    className="min-h-[50px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offer"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="rounded-md bg-slate-300 p-1 text-lg font-bold">
                  Предложение о работе
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Предложено</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">Не предложено</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offerComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарии</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Комментарии к предложению о работе"
                    className="min-h-[50px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues('offer') === 'true' && (
            <FormField
              control={form.control}
              name="jobStartComment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="rounded-md bg-slate-300 p-1 text-lg font-bold">
                    Комментарии к выходу на работу
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Комментарии" className="min-h-[50px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.getValues('offer') === 'false' && (
            <>
              {' '}
              <FormField
                control={form.control}
                name="refusalReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="rounded-md bg-slate-300 p-1 text-lg font-bold">
                      Причина отказа
                    </FormLabel>
                    <div className="flex items-center justify-between gap-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Не выбрано" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CANDIDATE_REFUSAL">Отказ кандидата</SelectItem>
                          <SelectItem value="HR_REFUSAL">Отказ HR</SelectItem>
                          <SelectItem value="TECH_REFUSAL">Отказ техлида</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="reset" onClick={() => resetSelectedOption('refusalReason')}>
                        сбросить
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="refusalReasonComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Комментарии</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Комментарии к отказу" className="min-h-[50px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type="submit" disabled={!form.formState.isDirty}>
            Обновить
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
