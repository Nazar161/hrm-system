import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/candidate/create')({
  component: () => <div>Hello /_authenticated/candidate/create!</div>
})