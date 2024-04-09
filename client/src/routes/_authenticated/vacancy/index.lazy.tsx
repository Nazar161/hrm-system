import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/vacancy/')({
  component: VacancyList,
});

function VacancyList() {
  return <div>Список Вакансий</div>;
}
