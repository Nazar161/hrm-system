import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/about')({
  component: About,
});

function About() {
  return <div>Страница о компании</div>;
}
