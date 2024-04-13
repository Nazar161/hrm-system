import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/application/')({
  component: () => <div>Hello /_authenticated/application/!</div>
})