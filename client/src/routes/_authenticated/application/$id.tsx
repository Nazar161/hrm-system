import { Link, createFileRoute } from '@tanstack/react-router';

import { useQuery, useMutation } from 'urql';
import { ApplicationQuery } from '../../../api/graphql/ApplicationQuery';

import { useToast } from '@/components/ui/use-toast';

import ApplicationForm, { FormSchemaType } from '../../../components/applicationForm';
import { UpdateApplicationMutation } from '../../../api/graphql/UpdateApplicationMutation';

type interviewStatus = 'SCHEDULED' | 'COMPLETED' | 'NOT_COMPLETED';
type testTaskStatus = 'NOT_ASKED' | 'COMPLETED' | 'NOT_COMPLETED' | 'REFUSAL_TO_COMPLETE';
type refusalReasonStatus = 'CANDIDATE_REFUSAL' | 'HR_REFUSAL' | 'TECH_REFUSAL';

export const Route = createFileRoute('/_authenticated/application/$id')({
  component: Application,
});

function Application() {
  const { id: applicationId } = Route.useParams();
  const [{ fetching, data, error }, reExecuteQuery] = useQuery({
    query: ApplicationQuery,
    variables: { applicationId },
  });

  const [{}, updateApplication] = useMutation(UpdateApplicationMutation);

  const { toast } = useToast();

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

  const onSubmit = async (formData: FormSchemaType) => {
    console.log(formData);

    updateApplication({
      updateApplicationInput: {
        id: applicationId,
        telInterview: formData.telInterview === '' ? null : (formData.telInterview as interviewStatus),
        telInterviewComment: formData.telInterviewComment,
        hrInterview: formData.hrInterview === '' ? null : (formData.hrInterview as interviewStatus),
        hrInterviewComment: formData.hrInterviewComment,
        techInterview: formData.techInterview === '' ? null : (formData.techInterview as interviewStatus),
        techInterviewComment: formData.techInterviewComment,
        testTask: formData.testTask === '' ? null : (formData.testTask as testTaskStatus),
        testTaskComment: formData.testTaskComment,
        offer: formData.offer === 'true' ? true : formData.offer === 'false' ? false : undefined,
        offerComment: formData.offerComment,
        jobStartComment: formData.jobStartComment,
        refusalReason: formData.refusalReason === '' ? null : (formData.refusalReason as refusalReasonStatus),
        refusalReasonComment: formData.refusalReasonComment,
      },
    }).then((result) => {
      if (result.error) {
        console.log(result.error.graphQLErrors);
      } else if (result.data?.updateApplication) {
        toast({
          description: <span>Отклик успешно обновлен.</span>,
          className: 'bg-slate-200',
        });

        reExecuteQuery();
      }
    });
  };

  return (
    <div>
      <h2 className="mb-5 mt-2 rounded-md bg-slate-300 p-2 text-3xl tracking-tight">
        Отклик:{' '}
        <Link
          to="/candidate/$id"
          params={{ id: data.application.candidate.id }}
          className="font-semibold hover:text-blue-500"
        >
          {data?.application.candidate.firstName} {data.application.candidate.lastName}
        </Link>{' '}
        на вакансию{' '}
        <Link
          to="/vacancy/$id"
          params={{ id: data.application.vacancy.id }}
          className="font-semibold hover:text-blue-500"
        >
          {data.application.vacancy.title}
        </Link>
      </h2>
      <div className="w-full md:w-2/5">
        <ApplicationForm
          telInterview={data.application.telInterview ?? ''}
          telInterviewComment={data.application.telInterviewComment ?? ''}
          hrInterview={data.application.hrInterview ?? ''}
          hrInterviewComment={data.application.hrInterviewComment ?? ''}
          techInterview={data.application.techInterview ?? ''}
          techInterviewComment={data.application.techInterviewComment ?? ''}
          testTask={data.application.testTask ?? ''}
          testTaskComment={data.application.testTaskComment ?? ''}
          offer={
            data.application.offer === false || data.application.offer === true
              ? `${data.application.offer}`
              : undefined
          }
          offerComment={data.application.testTaskComment ?? ''}
          jobStartComment={data.application.jobStartComment ?? ''}
          refusalReason={data.application.refusalReason ?? ''}
          refusalReasonComment={data.application.refusalReasonComment ?? ''}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
