import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function StoreList({ onSelect }) {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch(`${API}/api/stores`)
        const data = await res.json()
        setStores(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchStores()
  }, [])

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-3">Your stores</h3>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : stores.length === 0 ? (
        <p className="text-blue-300/80">No stores yet.</p>
      ) : (
        <ul className="divide-y divide-slate-700/60">
          {stores.map(s => (
            <li key={s.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{s.name}</p>
                <p className="text-blue-300/70 text-sm">{s.description || 'No description'}</p>
              </div>
              <button onClick={()=>onSelect?.(s)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded">Manage</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
