import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/vacancy/$id/edit')({
  component: () => <div>Hello /_authenticated/vacancy/$id/edit!</div>
})