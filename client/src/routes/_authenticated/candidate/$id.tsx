import { Link, createFileRoute } from '@tanstack/react-router';

import { useMutation, useQuery } from 'urql';
import { CandidateQuery } from '../../../api/graphql/candidate/CandidateQuery';
import { CreateApplicationMutation } from '../../../api/graphql/CreateApplicationMutation';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { getToken } from '../../../utils/authStore';

export const Route = createFileRoute('/_authenticated/candidate/$id')({
  component: Candidate,
});

const formSchema = z.object({
  resume: z
    .instanceof(FileList)
    .refine((file) => file?.item(0)?.type === 'application/pdf', 'Файл должен быть в формате .pdf'),
});

function Candidate() {
  const { id: candidateId } = Route.useParams();

  const [{ fetching, data, error }, reExecuteQuery] = useQuery({
    query: CandidateQuery,
    variables: { candidateId },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const fileRef = form.register('resume');

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('resume', data.resume[0]);
    formData.append('candidateId', candidateId);

    await fetch('http://localhost:5222/api/resume/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    }).then((result) => {
      if (result.status === 201) {
        reExecuteQuery();
        form.reset();
      }
    });
  };

  const [{}, createApplication] = useMutation(CreateApplicationMutation);
  const { toast, dismiss } = useToast();

  const selectVacancyForCandidate = (vacancyId: string) => {
    createApplication({
      createApplicationInput: {
        candidateId,
        vacancyId,
      },
    }).then((result) => {
      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else if (result.data?.createApplication.isSuccess) {
        const applicationId = result.data?.createApplication.id;
        toast({
          description: <span>Кандидат успешно отобран на вакансию.</span>,
          action: (
            <ToastAction altText="Перейти" onClick={() => dismiss()}>
              <Link to="/application/$id" params={{ id: applicationId }}>
                Перейти к отклику
              </Link>
            </ToastAction>
          ),
          className: 'bg-slate-200',
        });

        reExecuteQuery({ requestPolicy: 'network-only' });
      }
    });
  };

  if (!data) {
    return <div>Данные не загружены</div>;
  }

  if (fetching) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Ошибка</div>;
  }

  return (
    <div>
      <div className="mt-5 block lg:flex lg:gap-8">
        <div className="mb-5 w-full lg:w-2/5">
          <h2 className="mb-2 rounded-md bg-slate-300 p-2 text-3xl font-semibold tracking-tight">Кандидат</h2>
          <div>
            <div className="mb-2 flex">
              <span className="mr-2 font-bold">Имя фамилия:</span>
              <span>
                {data.candidate.firstName} {data.candidate.lastName}
              </span>
            </div>
            <div className="mb-2 flex">
              <span className="mr-2 font-bold">Должность:</span>
              <span>{data.candidate.position}</span>
            </div>
            <div className="mb-2 flex">
              <span className="mr-2 font-bold">Почта: </span>
              <a
                href={`mailto: ${data.candidate.email}`}
                className="block hover:text-blue-500 hover:underline"
              >
                {data.candidate.email}
              </a>
            </div>
            <div className="mb-2 flex">
              <span className="mr-2 font-bold">Телефон:</span>
              <div className="flex h-6 items-center gap-3">
                {data.candidate.phone && (
                  <>
                    <a href={`tel:+${data.candidate.phone}`} className="hover:text-blue-500 hover:underline">
                      +{data.candidate.phone}
                    </a>
                    <a href={`https://t.me/+${data.candidate.phone}`} target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="h-5 w-5">
                        <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                      </svg>
                    </a>
                    <a href={`https://wa.me/${data.candidate.phone}`} target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="mb-2 flex">
              <span className="mr-2 font-bold">Дата рождения:</span>
              <span>{format(`${data.candidate.dateOfBirth}`, 'PPP', { locale: ru })}</span>
            </div>
            <div className="mb-2 flex">
              <span className="font-bold">Резюме:</span>
              {data.candidate.resumes?.length === 0 && <div className="ml-2">Нет загруженных резюме</div>}

              <div className="flex flex-col overflow-hidden">
                {data.candidate.resumes?.map((resume, index) => {
                  if (!resume) {
                    return null;
                  }

                  return (
                    <a
                      key={resume.id}
                      href={resume.resumeUrl}
                      target="_blank"
                      className="ml-2 flex overflow-hidden underline hover:text-blue-500"
                    >
                      <span className="mr-2">{index + 1}.</span>
                      <span className="max-w-full">{resume.resumeTitle}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-96 max-w-full rounded-md border bg-slate-200 p-2"
            >
              <FormField
                control={form.control}
                name="resume"
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>Загрузка резюме</FormLabel>
                      <FormControl>
                        <Input
                          id="resume"
                          type="file"
                          placeholder="Выберите файл"
                          className="border-slate-500"
                          {...fileRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="mt-2">
                Загрузить
              </Button>
            </form>
          </Form>
        </div>
        <div className="mb-5 w-full lg:w-2/5">
          <h2 className="mb-2 rounded-md bg-slate-300 p-2 text-3xl font-semibold tracking-tight">Отклики</h2>
          {data.candidate.applications?.length === 0 ? (
            <div>Нет откликов</div>
          ) : (
            data.candidate.applications?.map((application) => {
              if (!application) {
                return null;
              }

              return (
                <div className="flex items-center justify-between border-b py-2" key={application.id}>
                  <Link
                    to="/vacancy/$id"
                    params={{ id: application.vacancyId }}
                    className="hover:text-blue-500"
                  >
                    {application.vacancyTitle}
                  </Link>
                  <Link to="/application/$id" params={{ id: application.id }}>
                    <Button>Перейти к отклику</Button>
                  </Link>
                </div>
              );
            })
          )}
          <div></div>
        </div>
      </div>
      <div className="w-full lg:w-2/3">
        <h2 className="mb-2 rounded-md bg-slate-300 p-2 text-3xl font-semibold tracking-tight">Вакансии</h2>
        {data.vacancies.map((vacancy) => {
          return (
            <div className="mb-2 flex flex-wrap items-center justify-between border-b pb-2" key={vacancy.id}>
              <Link to="/vacancy/$id" params={{ id: vacancy.id }} className="hover:text-blue-500">
                {vacancy.title}
              </Link>
              <Button onClick={() => selectVacancyForCandidate(vacancy.id)}>
                Отобрать кандидата на вакансию
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
