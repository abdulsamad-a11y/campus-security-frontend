import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { setUser } from '../data/mock'

function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = formData.email.split('@')[0] || 'Student'
    setUser({ name, role: 'Campus Safety Viewer' })
    navigate('/dashboard')
  }

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-600">Use any email address to preview the protected screens with mock data.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="email"
              name="email"
              type="email"
              placeholder="student@university.edu"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              required
            />
          </div>
        </div>
        <button className="mt-6 w-full rounded-full bg-ocean px-5 py-3 font-semibold text-white shadow-lg shadow-ocean/20 transition hover:-translate-y-0.5" type="submit">
          Log in
        </button>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <Link className="font-semibold text-ocean" to="/register">Create an account</Link>
          <Link className="font-semibold text-ocean" to="/">Back to home</Link>
        </div>
      </form>
    </main>
  )
}

export default LoginPage
