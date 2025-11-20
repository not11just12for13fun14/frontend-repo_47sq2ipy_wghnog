import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductManager({ store }) {
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    if (!store) return
    const res = await fetch(`${API}/api/stores/${store.id}/products`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(()=>{ load() }, [store?.id])

  const add = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_id: store.id, title, price: parseFloat(price), description })
      })
      if (!res.ok) throw new Error('Failed to create product')
      setTitle(''); setPrice(''); setDescription('')
      await load()
    } finally {
      setLoading(false)
    }
  }

  if (!store) return null

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-3">Products for {store.name}</h3>
      <form onSubmit={add} className="grid gap-3 mb-4">
        <input className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required type="number" step="0.01" />
        <textarea className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded">
          {loading ? 'Adding...' : 'Add product'}
        </button>
      </form>

      {products.length === 0 ? (
        <p className="text-blue-300/80">No products yet.</p>
      ) : (
        <ul className="grid gap-3">
          {products.map(p => (
            <li key={p.id} className="p-4 rounded bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{p.title}</p>
                  <p className="text-blue-300/70 text-sm">{p.description || 'No description'}</p>
                </div>
                <div className="text-white font-semibold">${'{'}p.price{'}'}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
