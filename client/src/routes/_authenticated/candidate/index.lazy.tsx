import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/candidate/')({
  component: CandidateList,
});

function CandidateList() {
  return (
    <>
      <h2>Список Кандидатов</h2>
    </>
  );
}
