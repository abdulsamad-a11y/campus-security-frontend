import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/report', label: 'Report' },
  { to: '/admin', label: 'Admin' },
  { to: '/geofences', label: 'Geofences' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
]

function Header() {
  const location = useLocation()

  return (
    <header className="border-b border-slate-800/10 bg-midnight text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="text-base font-semibold tracking-wide sm:text-lg" to="/">
          Campus Security Portal
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {links.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                className={`rounded-full px-3 py-2 transition ${
                  isActive
                    ? 'bg-white/10 font-medium text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
                to={link.to}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header
