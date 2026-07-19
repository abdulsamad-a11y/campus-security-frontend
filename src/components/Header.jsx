import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../assets/fud-logo.jfif'
import { useUserContext } from '../context/UserContext'
import privateAxiosInstance from '../auths/privateAxiosInstance'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const { user, isLoading, logout } = useUserContext()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const isAdmin = user?.role === 'ADMIN'
  const dashboardPath = isAdmin ? '/admin' : '/dashboard'

  const handleDashboardClick = (event) => {
    event.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    navigate(dashboardPath)
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      const res = await privateAxiosInstance.post('/auths/logout')
      console.log(res.data)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      logout()
      navigate('/login')
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/10 bg-midnight text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          className="flex items-center gap-3 text-base font-semibold tracking-wide sm:text-lg"
          to="/"
        >
          <img
            src={Logo}
            alt="FUD Logo"
            className="h-10 w-10 rounded-full object-cover"
          />

          <span>Campus Security Portal</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {user && (
              <button
                type="button"
                onClick={handleDashboardClick}
                className={`rounded-full px-3 py-2 transition ${
                  location.pathname === dashboardPath
                    ? 'bg-white/10 font-medium text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Dashboard
              </button>
            )}
          </nav>

          {isLoading ? (
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2">
              <div className="h-8 w-8 animate-pulse rounded-full bg-white/20" />

              <div className="space-y-1">
                <div className="h-2 w-20 animate-pulse rounded bg-white/20" />
                <div className="h-2 w-12 animate-pulse rounded bg-white/20" />
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                {user.regNumber?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-medium text-white">
                  {user.regNumber}
                </span>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-left text-xs text-slate-300 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                className="rounded-full px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="rounded-full bg-white px-3 py-2 font-medium text-midnight transition hover:bg-slate-200"
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header