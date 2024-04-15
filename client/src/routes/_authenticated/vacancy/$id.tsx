import { Link, createFileRoute } from '@tanstack/react-router';
import { useMutation, useQuery } from 'urql';

import { VacancyQuery } from '../../../api/graphql/vacancy/VacancyQuery';
import { CreateApplicationMutation } from '../../../api/graphql/CreateApplicationMutation';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export const Route = createFileRoute('/_authenticated/vacancy/$id')({
  component: Vacancy,
});

function Vacancy() {
  const { id: vacancyId } = Route.useParams();

  const { toast, dismiss } = useToast();

  const [{ fetching, data, error }, reExecuteQuery] = useQuery({
    query: VacancyQuery,
    variables: { vacancyId },
  });
  const [{}, createApplication] = useMutation(CreateApplicationMutation);

  const selectCandidateForVacancy = (candidateId: string) => {
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
      <div className="mb-10 mt-5 flex flex-col gap-10 lg:flex-row">
        <div className="rounded-lg border bg-slate-300 p-4 lg:w-1/2">
          <h2 className="mb-4 pb-2 text-3xl font-semibold tracking-tight">Вакансия</h2>
          <div className="mb-5">
            <h2 className="text-xl tracking-tight">Назваине:</h2>
            <h2 className="text-2xl font-semibold tracking-tight">{data.vacancy.title}</h2>
            <p>
              от {data.vacancy.minSalary} до {data.vacancy.maxSalary}
            </p>
          </div>
          <div className="mb-5">
            <h2 className="text-xl tracking-tight">Описание:</h2>
            <p className="font-semibold tracking-tight">{data.vacancy.description}</p>
          </div>
        </div>
        <div className="rounded-lg border bg-slate-300 p-4 lg:w-1/2">
          <h2 className="mb-4 pb-2 text-3xl font-semibold tracking-tight">Отклики</h2>
          {data.vacancy.applications?.length === 0 ? (
            <div>Нет откликов</div>
          ) : (
            data.vacancy.applications?.map((application) => {
              if (!application) {
                return null;
              }

              return (
                <div className="flex items-center justify-between border-b py-2" key={application.id}>
                  <span>
                    {application.candidateName}({application.candidatePosition})
                  </span>
                  <Link to="/application/$id" params={{ id: application.id }}>
                    <Button>Перейти к отклику</Button>
                  </Link>
                </div>
              );
            })
          )}
        </div>
        <div className="rounded-lg border bg-slate-300 p-4 px-4 lg:w-1/2">
          <h2 className="mb-4 pb-2 text-3xl font-semibold tracking-tight">Свободные кандидаты</h2>
          {data.availableCandidates.length > 0 ? (
            <div>
              {data.availableCandidates.map((candidate) => {
                return (
                  <div className="mb-2 flex items-center justify-between border-b pb-2" key={candidate.id}>
                    <Link to="/candidate/$id" params={{ id: candidate.id }} className="hover:text-blue-500">
                      {candidate.firstName} {candidate.lastName}({candidate.position})
                    </Link>
                    <Button onClick={() => selectCandidateForVacancy(candidate.id)}>
                      Отобрать на вакансию
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div>Нет свободных кандидатов</div>
              <Link to="/candidate">
                <Button>Перейти к полному списку кандидатов</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
