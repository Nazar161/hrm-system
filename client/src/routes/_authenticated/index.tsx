import { createFileRoute } from '@tanstack/react-router';

import { graphql } from 'gql.tada';
import { useQuery } from 'urql';

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

const TestAuthQuery = graphql(`
  query testAuthQuery {
    hello
  }
`);

function Index() {
  const [{ data, fetching, error }] = useQuery({ query: TestAuthQuery });

  if (fetching) {
    return <div>Загрузка</div>;
  }

  if (error) {
    console.log(error);
    return <div>Ошибка</div>;
  }

  return <div>Главная страница. {data?.hello}</div>;
}
