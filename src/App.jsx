import { useState } from 'react'
import StoreCreator from './components/StoreCreator'
import StoreList from './components/StoreList'
import ProductManager from './components/ProductManager'

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames" className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">E-commerce Builder</h1>
          </div>
          <p className="text-blue-200/80 mt-2 max-w-2xl">Create stores, add products, and manage your catalog. This is a lightweight Shopify-like manager to get you started fast.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <StoreCreator onCreated={()=>setSelected(null)} />
          <StoreList onSelect={setSelected} />
        </div>

        <div className="mt-8">
          <ProductManager store={selected} />
        </div>
      </div>
    </div>
  )
}

export default App
