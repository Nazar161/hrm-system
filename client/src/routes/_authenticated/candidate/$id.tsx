import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/candidate/$id')({
  component: () => <div>Hello /candidate/$id!</div>
})
