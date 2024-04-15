import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/candidate/$id/edit')({
  component: () => <div>Hello /_authenticated/candidate/$id/edit!</div>,
});
