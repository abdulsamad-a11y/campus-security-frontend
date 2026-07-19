import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import publicAxiosInstance from '../auths/publicAxiosInstance'


function RegisterPage() {


  const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const [showPassword, setShowPassword] = useState(false)
 
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    regNumber: '',
    email: '',
    password: '',
  })

const handleSubmit = async (event) => {
  event.preventDefault()

  setError('')
  setLoading(true)

  try {
    await publicAxiosInstance.post('/auths/register', formData)

    navigate('/login')
  } catch (error) {
    setError(
      error.response?.data?.message ||
      'Registration failed. Please try again.'
    )
    console.error(error?.response?.data || error)
  } finally {
    setLoading(false)
  }
}

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-600">Register a mock profile to explore the dashboard and reporting experience.</p>
        {error && (
  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="firstName">First name</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="firstName"
              name="firstName"
              placeholder="Aisha"
              value={formData.firstName}
              onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="lastName">Last name</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="lastName"
              name="lastName"
              placeholder="Khan"
              value={formData.lastName}
              onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="regNumber">Registration number</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="regNumber"
              name="regNumber"
              placeholder="CS/2024/001"
              value={formData.regNumber}
              onChange={(event) => setFormData({ ...formData, regNumber: event.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="email"
              name="email"
              type="email"
              placeholder="aisha@university.edu"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              required
            />
          </div>
         <div className="md:col-span-2">
  <label
    className="mb-2 block text-sm font-medium text-slate-700"
    htmlFor="password"
  >
    Password
  </label>

  <div className="relative">
    <input
      className="w-full rounded-2xl border border-slate-300 px-4 py-3 pr-20 outline-none focus:border-ocean"
      id="password"
      name="password"
      type={showPassword ? 'text' : 'password'}
      placeholder="••••••••"
      value={formData.password}
      onChange={(event) =>
        setFormData({
          ...formData,
          password: event.target.value,
        })
      }
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-ocean"
    >
      {showPassword ? 'Hide' : 'Show'}
    </button>
  </div>
</div>
        </div>
       <button
  className="mt-6 w-full rounded-full bg-ocean px-5 py-3 font-semibold text-white shadow-lg shadow-ocean/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
  type="submit"
  disabled={loading}
>
  {loading ? 'Creating account...' : 'Register'}
</button>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <Link className="font-semibold text-ocean" to="/login">Already have an account?</Link>
          <Link className="font-semibold text-ocean" to="/">Back to home</Link>
        </div>
      </form>
    </main>
  )
}

export default RegisterPage
