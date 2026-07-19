import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

function HomePage() {
  const navigate = useNavigate()
  const { user, isLoading } = useUserContext()

  const isAdmin = user?.role === 'ADMIN'
  const isLoggedIn = Boolean(user)

  const handleSubmitReport = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    navigate('/report')
  }

  const operationsDashboard = isAdmin
    ? '/admin'
    : '/dashboard'

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section className="grid items-center gap-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-12">

        {/* Hero Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ocean">
            Campus security operations center
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
            A modern incident management portal for campus safety teams.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Designed to support real-time reporting, incident tracking,
            geofence monitoring, and administrative oversight for a university
            security environment. This interface is structured to reflect how
            a production campus safety platform would help staff respond
            quickly, coordinate action, and maintain visibility across critical
            zones.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">

            {/* Dashboard Button */}
            {!isLoading && (
              <Link
                className="rounded-full bg-ocean px-5 py-3 font-semibold text-white shadow-lg shadow-ocean/20 transition hover:-translate-y-0.5"
                to={operationsDashboard}
              >
                {isAdmin
                  ? 'View administration dashboard'
                  : 'View operations dashboard'}
              </Link>
            )}

            {/* Submit Report Button
                Hidden for administrators */}
            {!isAdmin && (
              <button
                type="button"
                onClick={handleSubmitReport}
                className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Submit an incident report
              </button>
            )}

          </div>
        </div>

        {/* Features */}
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">

          <h2 className="text-xl font-semibold text-slate-900">
            What the portal supports
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-slate-600">

            <li className="rounded-2xl border border-slate-200 bg-white p-4">
              Centralized incident monitoring with live status updates for
              security teams.
            </li>

            <li className="rounded-2xl border border-slate-200 bg-white p-4">
              Structured reporting workflows for theft, harassment, vandalism,
              and other campus safety events.
            </li>

            <li className="rounded-2xl border border-slate-200 bg-white p-4">
              Geofence management and administrative controls designed for
              scalable operations.
            </li>

          </ul>
        </div>

      </section>
    </main>
  )
}

export default HomePage