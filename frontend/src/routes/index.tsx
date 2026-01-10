import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="page">
      <h1>FastReact Template</h1>
      <p>A React template with TanStack Router, Query, Form, and Table.</p>
    </div>
  )
}
