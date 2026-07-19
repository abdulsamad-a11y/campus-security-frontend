import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import privateAxiosInstance from '../auths/privateAxiosInstance'
import { useUserContext } from '../context/UserContext'

const filters = ['All', 'Open', 'In Progress', 'Resolved']

function AdminPage() {
  const {
    user,
    isLoading: isUserLoading,
  } = useUserContext()

  const [activeFilter, setActiveFilter] = useState('All')
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingReportId, setUpdatingReportId] = useState(null)

  // Fetch all reports
  useEffect(() => {
    if (isUserLoading || user?.role !== 'ADMIN') {
      return
    }

    const fetchAllReports = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await privateAxiosInstance.get('/reports/all')

        setReports(response.data.reports)
      } catch (error) {
        console.error(
          'Failed to fetch reports:',
          error?.response?.data || error
        )

        setError(
          error.response?.data?.message ||
          'Failed to load reports. Please try again.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllReports()
  }, [isUserLoading, user])

  // Filter reports
  const visibleReports = useMemo(() => {
    if (activeFilter === 'All') {
      return reports
    }

    return reports.filter(
      (report) => report.status === activeFilter
    )
  }, [activeFilter, reports])

  // Update report status
  const handleStatusChange = async (reportId, newStatus) => {
    try {
      setUpdatingReportId(reportId)
      setError('')

      const response = await privateAxiosInstance.patch(
        `/reports/${reportId}/status`,
        {
          status: newStatus,
        }
      )

      const updatedReport = response.data.report

      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId
            ? updatedReport
            : report
        )
      )
    } catch (error) {
      console.error(
        'Failed to update report status:',
        error?.response?.data || error
      )

      setError(
        error.response?.data?.message ||
        'Failed to update report status. Please try again.'
      )
    } finally {
      setUpdatingReportId(null)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Loading user
  |--------------------------------------------------------------------------
  */

  if (isUserLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading admin dashboard...
        </p>
      </main>
    )
  }

  /*
  |--------------------------------------------------------------------------
  | Redirect non-admin users
  |--------------------------------------------------------------------------
  */

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

      {/* Admin Welcome Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">

        <div className="flex flex-wrap items-center justify-between gap-6">

          {/* Admin Profile */}
          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ocean text-xl font-bold text-white shadow-sm">
              {user?.firstName?.charAt(0).toUpperCase()}
              {user?.lastName?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-ocean">
                Administration dashboard
              </p>

              <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                Welcome, {user?.firstName} {user?.lastName}
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Monitor reports and manage incident statuses from one place.
              </p>
            </div>

          </div>

          {/* Total Reports */}
          <div className="rounded-2xl bg-slate-50 px-5 py-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total reports
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {isLoading ? '...' : reports.length}
            </p>

          </div>

        </div>

        {/* Admin Information */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Your information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your registered administrator account details
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* First Name */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                First name
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {user?.firstName}
              </p>
            </div>

            {/* Last Name */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Last name
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {user?.lastName}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Email
              </p>

              <p className="mt-2 break-all font-semibold text-slate-900">
                {user?.email}
              </p>
            </div>

            {/* Role */}
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

      </section>

      {/* Reports Management */}
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">

        {/* Section Header */}
        <div className="mb-6">

          <h2 className="text-xl font-semibold text-slate-900">
            Manage reports
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Review submitted reports and update their current status.
          </p>

        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">

          {filters.map((filter) => (
            <button
              key={filter}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}

        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading reports...
          </div>
        ) : visibleReports.length === 0 ? (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">

            <p className="font-medium text-slate-700">
              No reports found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              There are no reports matching the selected filter.
            </p>

          </div>

        ) : (

          /* Reports Table */
          <div className="overflow-x-auto">

            <table className="min-w-full divide-y divide-slate-200">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Incident type
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Location
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Date & time
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Description
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Priority
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-200">

                {visibleReports.map((report) => (

                  <tr
                    key={report.id}
                    className="odd:bg-white even:bg-slate-50"
                  >

                    {/* Type */}
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {report.type}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {report.location}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {new Date(
                        report.datetime
                      ).toLocaleString()}
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-4 py-3 text-sm text-slate-700">

                      <p className="line-clamp-2">
                        {report.description}
                      </p>

                    </td>

                    {/* Priority */}
                    <td className="px-4 py-3 text-sm text-slate-700">

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          report.priority === 'Critical'
                            ? 'bg-red-100 text-red-700'
                            : report.priority === 'High'
                              ? 'bg-rose-100 text-rose-700'
                              : report.priority === 'Medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {report.priority}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-sm text-slate-700">

                      <select
                        className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-ocean disabled:cursor-not-allowed disabled:opacity-60"
                        value={report.status}
                        disabled={
                          updatingReportId === report.id
                        }
                        onChange={(event) =>
                          handleStatusChange(
                            report.id,
                            event.target.value
                          )
                        }
                      >

                        <option value="Open">
                          Open
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                      </select>

                      {updatingReportId === report.id && (
                        <span className="ml-2 text-xs text-slate-500">
                          Updating...
                        </span>
                      )}

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

export default AdminPage