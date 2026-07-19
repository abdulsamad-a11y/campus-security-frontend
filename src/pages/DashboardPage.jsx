import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

function DashboardPage() {
  const {
    user,
    reports,
    isReportsLoading,
  } = useUserContext()

  const metrics = [
    {
      label: 'Total reports',
      value: reports.length,
    },
    {
      label: 'Open cases',
      value: reports.filter((report) => report.status === 'Open').length,
    },
    {
      label: 'Resolved',
      value: reports.filter((report) => report.status === 'Resolved').length,
    },
    {
      label: 'High priority',
      value: reports.filter(
        (report) =>
          report.priority === 'High' ||
          report.priority === 'Critical'
      ).length,
    },
  ]

  const recentReports = reports.slice(0, 4)

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-amber-100 text-amber-700'

      case 'In Progress':
        return 'bg-sky-100 text-sky-700'

      case 'Resolved':
        return 'bg-emerald-100 text-emerald-700'

      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

      {/* Welcome Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Welcome back, {user?.firstName} {user?.lastName}
            </h2>

            <p className="mt-1 text-slate-600">
              Stay informed about your submitted security reports.
            </p>
          </div>

          <Link
            className="rounded-full bg-ocean px-5 py-3 font-semibold text-white shadow-lg shadow-ocean/20 transition hover:-translate-y-0.5"
            to="/report"
          >
            Create report
          </Link>
        </div>

        {/* User Information */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean text-lg font-bold text-white shadow-sm">
              {user?.firstName?.charAt(0).toUpperCase()}
              {user?.lastName?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Your information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Your registered account details
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                First name
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {user?.firstName}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Last name
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {user?.lastName}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Registration number
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {user?.regNumber}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Email
              </p>

              <p className="mt-2 break-all font-semibold text-slate-900">
                {user?.email}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Role
              </p>

              <span className="mt-2 inline-flex rounded-full bg-ocean/10 px-3 py-1 text-sm font-semibold text-ocean">
                {user?.role}
              </span>
            </div>

          </div>
        </div>

        {/* Report Metrics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm text-slate-500">
                {metric.label}
              </p>

              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {isReportsLoading ? '...' : metric.value}
              </p>
            </article>
          ))}

        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your most recently submitted reports
            </p>
          </div>

          <Link
            className="font-semibold text-ocean"
            to="/view-reports"
          >
            See all
          </Link>
        </div>

        {isReportsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : recentReports.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
            <p className="font-medium text-slate-700">
              No reports yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Your submitted security reports will appear here.
            </p>

            <Link
              to="/report"
              className="mt-4 inline-block rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white"
            >
              Create your first report
            </Link>
          </div>
        ) : (
          <div className="space-y-3">

            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >

                <div>
                  <p className="font-semibold text-slate-900">
                    {report.type}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {report.location}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Priority: {report.priority}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  )
}

export default DashboardPage