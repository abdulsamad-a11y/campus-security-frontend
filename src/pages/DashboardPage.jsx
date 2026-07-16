import { Link } from 'react-router-dom'
import { getReports, getUser } from '../data/mock'

function DashboardPage() {
  const reports = getReports()
  const user = getUser()

  const metrics = [
    { label: 'Total reports', value: reports.length },
    { label: 'Open cases', value: reports.filter((report) => report.status === 'Open').length },
    { label: 'Resolved', value: reports.filter((report) => report.status === 'Resolved').length },
    { label: 'High priority', value: reports.filter((report) => report.priority === 'High').length },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Welcome back, {user.name}</h2>
            <p className="mt-1 text-slate-600">{user.role}</p>
          </div>
          <Link className="rounded-full bg-ocean px-5 py-3 font-semibold text-white shadow-lg shadow-ocean/20" to="/report">
            Create report
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Recent activity</h2>
            <Link className="font-semibold text-ocean" to="/view-reports">See all</Link>
          </div>
          <div className="space-y-3">
            {reports.slice(0, 4).map((report) => (
              <div key={report.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{report.type}</p>
                  <p className="text-sm text-slate-500">{report.location}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  report.status === 'Open'
                    ? 'bg-amber-100 text-amber-700'
                    : report.status === 'In Progress'
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">Submit incident</p>
                <p className="text-sm text-slate-500">Use the guided report form.</p>
              </div>
              <Link className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white" to="/report">Go</Link>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">Manage geofences</p>
                <p className="text-sm text-slate-500">Track zones that require alerts.</p>
              </div>
              <Link className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white" to="/geofences">Go</Link>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">Admin review</p>
                <p className="text-sm text-slate-500">Review status updates and priorities.</p>
              </div>
              <Link className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white" to="/admin">Go</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DashboardPage
