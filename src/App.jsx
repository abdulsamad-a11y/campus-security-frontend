import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ReportPage from './pages/ReportPage'
import AdminPage from './pages/AdminPage'
import GeofencesPage from './pages/GeofencesPage'
import ViewReportsPage from './pages/ViewReportsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/geofences" element={<GeofencesPage />} />
          <Route path="/view-reports" element={<ViewReportsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
