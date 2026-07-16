import { useState } from 'react'
import { getGeofences, writeStorage, STORAGE_KEYS } from '../data/mock'

function GeofencesPage() {
  const [formData, setFormData] = useState({ name: '', latitude: '', longitude: '', radius: '' })
  const [geofences, setGeofences] = useState(getGeofences())

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextGeofences = [...geofences, { id: Date.now(), ...formData }]
    writeStorage(STORAGE_KEYS.geofences, nextGeofences)
    setGeofences(nextGeofences)
    setFormData({ name: '', latitude: '', longitude: '', radius: '' })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Add geofence zone</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">Name</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
                id="name"
                name="name"
                placeholder="Hostel main gate"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="latitude">Latitude</label>
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
                  id="latitude"
                  name="latitude"
                  placeholder="11.9921"
                  value={formData.latitude}
                  onChange={(event) => setFormData({ ...formData, latitude: event.target.value })}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="longitude">Longitude</label>
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
                  id="longitude"
                  name="longitude"
                  placeholder="9.9993"
                  value={formData.longitude}
                  onChange={(event) => setFormData({ ...formData, longitude: event.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="radius">Radius (km)</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-ocean"
                id="radius"
                name="radius"
                placeholder="0.8"
                value={formData.radius}
                onChange={(event) => setFormData({ ...formData, radius: event.target.value })}
                required
              />
            </div>
            <button className="rounded-full bg-ocean px-5 py-3 font-semibold text-white" type="submit">Save geofence</button>
          </form>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-slate-900">Current geofences</h2>
          <div className="mt-4 space-y-3">
            {geofences.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">Lat {item.latitude}, Lon {item.longitude}</p>
                </div>
                <div className="text-right text-sm font-medium text-slate-700">
                  <div>{item.radius} km radius</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default GeofencesPage
