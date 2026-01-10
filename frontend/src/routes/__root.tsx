import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import '../styles/globals.css'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <header className="root-header">
        <nav className="root-nav">
          <Link to="/" className="root-nav__link">
            Home
          </Link>
          <Link to="/demo" className="root-nav__link">
            Demo
          </Link>
        </nav>
      </header>
      <main className="root-main">
        <Outlet />
      </main>
    </>
  )
}
