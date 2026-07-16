const STORAGE_KEYS = {
  reports: 'campus-security-reports',
  geofences: 'campus-security-geofences',
  user: 'campus-security-user'
}

const defaultReports = [
  {
    id: 1,
    type: 'Theft',
    location: 'Main Library',
    datetime: '2026-07-10T10:30',
    description: 'A student reported a phone stolen from the second-floor study area.',
    priority: 'High',
    status: 'Open'
  },
  {
    id: 2,
    type: 'Harassment',
    location: 'Student Union Gate',
    datetime: '2026-07-08T18:15',
    description: 'Security staff documented an intimidating incident reported by a group of students.',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: 3,
    type: 'Vandalism',
    location: 'Sports Complex',
    datetime: '2026-07-05T22:40',
    description: 'Graffiti was observed on the west wall near the training center.',
    priority: 'Low',
    status: 'Resolved'
  }
]

const defaultGeofences = [
  { id: 1, name: 'Library Perimeter', latitude: '11.9921', longitude: '9.9993', radius: '0.8' },
  { id: 2, name: 'Hostel Zone', latitude: '11.9887', longitude: '9.9966', radius: '1.2' }
]

const defaultUser = { name: 'Ada', role: 'Student Safety Lead' }

function readStorage(key, fallback) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback
    }
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (_error) {
    return fallback
  }
}

function writeStorage(key, value) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return value
}

function getReports() {
  const reports = readStorage(STORAGE_KEYS.reports, [])
  if (!reports.length) {
    writeStorage(STORAGE_KEYS.reports, defaultReports)
    return defaultReports
  }
  return reports
}

function getGeofences() {
  const geofences = readStorage(STORAGE_KEYS.geofences, [])
  if (!geofences.length) {
    writeStorage(STORAGE_KEYS.geofences, defaultGeofences)
    return defaultGeofences
  }
  return geofences
}

function getUser() {
  return readStorage(STORAGE_KEYS.user, defaultUser)
}

function setUser(user) {
  return writeStorage(STORAGE_KEYS.user, user)
}

function createReportEntry(formData) {
  return {
    id: Date.now(),
    type: formData.type || 'Other',
    location: formData.location || '',
    datetime: formData.datetime || new Date().toISOString().slice(0, 16),
    description: formData.description || '',
    priority: formData.priority || 'Medium',
    status: 'Open'
  }
}

export { STORAGE_KEYS, defaultReports, defaultGeofences, defaultUser, getReports, getGeofences, getUser, setUser, createReportEntry, writeStorage }
