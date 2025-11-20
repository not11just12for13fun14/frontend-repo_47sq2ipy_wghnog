import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function StoreCreator({ onCreated }) {
  const [name, setName] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/stores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, subdomain, description })
      })
      if (!res.ok) throw new Error('Failed to create store')
      const data = await res.json()
      onCreated?.(data)
      setName(''); setSubdomain(''); setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-3">Create a new store</h3>
      <form onSubmit={submit} className="grid gap-3">
        <input className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Store name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Subdomain (optional)" value={subdomain} onChange={e=>setSubdomain(e.target.value)} />
        <textarea className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Description (optional)" value={description} onChange={e=>setDescription(e.target.value)} />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded">
          {loading ? 'Creating...' : 'Create Store'}
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  )
}
