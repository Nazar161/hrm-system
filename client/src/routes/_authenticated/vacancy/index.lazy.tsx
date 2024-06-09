import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { useQuery } from 'urql';
import { VacancyListQuery } from '../../../api/graphql/vacancy/VacancyListQuery';

import VacancyCard from '@/components/cards/vacancyCard';
import { Button } from '@/components/ui/button';

export const Route = createLazyFileRoute('/_authenticated/vacancy/')({
  component: VacancyList,
});

function VacancyList() {
  const [{ fetching, error, data }] = useQuery({ query: VacancyListQuery });

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
        <h2 className="text-3xl font-semibold tracking-tight">Список Вакансий</h2>
        <Link to="/vacancy/create" className="flex items-center justify-center">
          <Button>Создать вакансию</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.vacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            id={vacancy.id}
            title={vacancy.title}
            description={vacancy.description}
            minSalary={vacancy.minSalary}
            maxSalary={vacancy.maxSalary}
          />
        ))}
      </div>
    </div>
  );
}
