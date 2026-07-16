import { useMemo, useState } from 'react'
import { getReports } from '../data/mock'

const filters = ['All', 'Open', 'In Progress', 'Resolved']

function ViewReportsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const reports = getReports()

  const visibleReports = useMemo(() => {
    if (activeFilter === 'All') return reports
    return reports.filter((report) => report.status === activeFilter)
  }, [activeFilter, reports])

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">All reports</h2>
          <p className="mt-1 text-slate-600">Review the mock incident records stored locally in your browser.</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                activeFilter === filter
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700'
              }`}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Incident type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date & time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {visibleReports.map((report) => (
                <tr key={report.id} className="odd:bg-white even:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">{report.type}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{report.location}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{report.datetime}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{report.description}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      report.priority === 'High'
                        ? 'bg-rose-100 text-rose-700'
                        : report.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                    }`}>{report.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{report.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default ViewReportsPage
