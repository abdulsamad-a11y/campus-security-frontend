import { useState } from 'react'
import privateAxiosInstance from '../auths/privateAxiosInstance'
import { useUserContext } from '../context/UserContext'

function ReportPage() {
  const [formData, setFormData] = useState({
    type: '',
    priority: 'Medium',
    location: '',
    datetime: '',
    description: '',
  })

  const { setReports } = useUserContext()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setError('')
    setIsSubmitting(true)

    try {
 const res = await privateAxiosInstance.post('/reports', formData)

const newReport = res.data.report

setReports((previousReports) => [
  newReport,
  ...previousReports,
])

setMessage('Your report has been submitted successfully.')

      setFormData({
        type: '',
        priority: 'Medium',
        location: '',
        datetime: '',
        description: '',
      })

      console.log(res.data)
    } catch (error) {
      console.error('Report submission failed:', error?.response?.data || error)

      setError(
        error.response?.data?.message ||
        'Failed to submit report. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-slate-900">
          Security incident report
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Capture the event details below and submit your report to the campus
          security team.
        </p>

        {/* Error message */}
        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success message */}
        {message && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="type"
            >
              Type of incident
            </label>

            <select
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="type"
              name="type"
              value={formData.type}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  type: event.target.value,
                })
              }
              required
            >
              <option value="">Select incident type</option>
              <option value="Theft">Theft</option>
              <option value="Burglary">Burglary</option>
              <option value="Harassment">Harassment</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Cyber Security Threat">
                Cyber Security Threat
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="priority"
            >
              Priority level
            </label>

            <select
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  priority: event.target.value,
                })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="location"
            >
              Location
            </label>

            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="location"
              name="location"
              placeholder="Library, gate, hostel, field"
              value={formData.location}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  location: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="md:col-span-2">
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="datetime"
            >
              Date and time
            </label>

            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="datetime"
              name="datetime"
              type="datetime-local"
              value={formData.datetime}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  datetime: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="md:col-span-2">
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="description"
            >
              Description
            </label>

            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="description"
              name="description"
              placeholder="Describe what happened, any witnesses, and the current situation."
              value={formData.description}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <button
          className="mt-6 rounded-full bg-ocean px-5 py-3 font-semibold text-white shadow-lg shadow-ocean/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting report...' : 'Submit report'}
        </button>
      </form>
    </main>
  )
}

export default ReportPage