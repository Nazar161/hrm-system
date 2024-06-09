import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { useQuery } from 'urql';
import { CandidateListQuery } from '../../../api/graphql/candidate/CandidateListQuery';

import CandidateCard from '@/components/cards/candidateCard';
import { Button } from '@/components/ui/button';

export const Route = createLazyFileRoute('/_authenticated/candidate/')({
  component: CandidateList,
});

function CandidateList() {
  const [{ fetching, error, data }] = useQuery({ query: CandidateListQuery });

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
    <div className="mt-5">
      <div className="mb-4 flex flex-wrap items-center justify-between border-b pb-2">
        <h2 className="text-3xl font-semibold tracking-tight">Список Кандидатов</h2>
        <Link to="/candidate/create" className="flex items-center justify-center">
          <Button>Добавить нового кандидата</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            id={candidate.id}
            firstName={candidate.firstName}
            lastName={candidate.lastName}
            position={candidate.position}
            email={candidate.email}
            phone={candidate.phone}
          />
        ))}
      </div>
    </div>
  );
}
