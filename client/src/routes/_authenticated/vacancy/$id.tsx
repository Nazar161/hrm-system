import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/vacancy/$id')({
  component: () => <div>Hello /vacancy/$id!</div>
})