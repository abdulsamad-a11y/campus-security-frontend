import { useMemo, useState } from 'react'
import { useUserContext } from '../context/UserContext'

const filters = ['All', 'Open', 'In Progress', 'Resolved']

function ViewReportsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const {
    reports,
    isReportsLoading,
  } = useUserContext()

  const visibleReports = useMemo(() => {
    if (activeFilter === 'All') {
      return reports
    }

    return reports.filter(
      (report) => report.status === activeFilter
    )
  }, [activeFilter, reports])

  const formatDate = (date) => {
    if (!date) return 'N/A'

    return new Date(date).toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-700'

      case 'High':
        return 'bg-rose-100 text-rose-700'

      case 'Medium':
        return 'bg-amber-100 text-amber-700'

      case 'Low':
        return 'bg-slate-100 text-slate-700'

      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

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

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              My reports
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              View and track the security reports you have submitted.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
            <span className="text-slate-500">
              Total reports
            </span>

            <span className="ml-2 font-semibold text-slate-900">
              {isReportsLoading ? '...' : reports.length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const count =
              filter === 'All'
                ? reports.length
                : reports.filter(
                    (report) => report.status === filter
                  ).length

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? 'border-ocean bg-ocean text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-ocean hover:text-ocean'
                }`}
              >
                {filter}

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    activeFilter === filter
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Loading State */}
        {isReportsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : visibleReports.length === 0 ? (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xl">
              📄
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {activeFilter === 'All'
                ? 'No reports yet'
                : `No ${activeFilter.toLowerCase()} reports`}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {activeFilter === 'All'
                ? 'Your submitted security reports will appear here.'
                : 'There are no reports matching this status.'}
            </p>
          </div>

        ) : (

          /* Desktop Table */
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">

              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Incident
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date & Time
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Description
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Priority
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                {visibleReports.map((report) => (
                  <tr
                    key={report.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">
                        {report.type}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Report ID: {report.id.slice(0, 8)}...
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {report.location}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                      {formatDate(report.datetime)}
                    </td>

                    <td className="max-w-xs px-4 py-4 text-sm text-slate-600">
                      <p className="line-clamp-2">
                        {report.description}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                          report.priority
                        )}`}
                      >
                        {report.priority}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}

      </section>

    </main>
  )
}

export default ViewReportsPage