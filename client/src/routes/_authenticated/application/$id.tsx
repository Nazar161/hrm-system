import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/application/$id')({
  component: () => <div>Hello /_authenticated/application/$id!</div>
})