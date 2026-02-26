import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchMaterials } from '../store/inventorySlice'
import { inventoryApi } from '../api'
import { RootState, AppDispatch } from '../store'
import { Plus, Package, Trash2, X, ChevronRight, Bookmark } from 'lucide-react'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, materials } = useSelector((state: RootState) => state.inventory)
  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', materials: [] as any[] })

  useEffect(() => {
    dispatch(fetchProducts(0))
    dispatch(fetchMaterials(0))
  }, [dispatch])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    await inventoryApi.saveProduct({
      ...newProduct,
      price: Number(newProduct.price),
      materials: newProduct.materials.map(m => ({
        rawMaterialId: m.id,
        requiredQuantity: Number(m.qty)
      }))
    })
    setShowAdd(false)
    dispatch(fetchProducts(0))
    setNewProduct({ name: '', price: '', materials: [] })
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await inventoryApi.deleteProduct(id)
      dispatch(fetchProducts(0))
    }
  }

  return (
    <div className="container space-y-8 animate-in" style={{ paddingBottom: '3rem' }}>
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Products</h1>
          <p className="text-text-muted">Manage your catalog and material requirements.</p>
        </div>
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} className="btn btn-primary">
            <Plus size={20} /> Add New Product
          </button>
        )}
      </header>

      {showAdd && (
        <div className="animate-in">
          <form onSubmit={handleSave} className="card space-y-6 bg-white/5 border-indigo-500/20">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Bookmark className="text-indigo-400" size={20} />
                New Product Details
              </h3>
              <button type="button" onClick={() => setShowAdd(false)} className="text-text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Product Name</label>
                <input 
                  type="text"
                  placeholder="Ex: Luxury Headphones, Smartwatch..." 
                  className="input" 
                  required
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Unit Price (CAD)</label>
                <input 
                  placeholder="0.00" 
                  type="number" 
                  step="0.01" 
                  className="input" 
                  required
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-4 border-t border-white/5 pt-6">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Component Materials</label>
                <div className="flex gap-2">
                  <select 
                    className="input py-1 text-sm bg-indigo-500/5 border-indigo-500/10 min-w-[200px]" 
                    onChange={e => {
                      const mat = materials.find((m: any) => m.id === Number(e.target.value))
                      if (mat && !newProduct.materials.find(m => m.id === mat.id)) {
                        setNewProduct({...newProduct, materials: [...newProduct.materials, {...mat, qty: 1}]})
                      }
                      e.target.value = ""
                    }}
                  >
                    <option value="">Select a material...</option>
                    {materials.map((m: any) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid gap-2">
                {newProduct.materials.map(m => (
                  <div key={m.id} className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    <span className="font-medium text-sm">{m.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-text-muted">Qty:</span>
                        <input 
                          type="number" 
                          className="input w-24 py-1 text-center font-bold" 
                          value={m.qty} 
                          onChange={e => {
                            const updated = newProduct.materials.map(item => 
                              item.id === m.id ? {...item, qty: e.target.value} : item
                            )
                            setNewProduct({...newProduct, materials: updated})
                          }}
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setNewProduct({...newProduct, materials: newProduct.materials.filter(item => item.id !== m.id)})} 
                        className="p-2 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {newProduct.materials.length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-white/5 rounded-xl">
                    <p className="text-xs text-text-muted">No materials added yet. Select from the dropdown above.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button type="button" onClick={() => setShowAdd(false)} className="btn text-white hover:bg-white/5">Cancel</button>
              <button type="submit" className="btn btn-primary px-8">Create Product</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="card group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
                <Package size={24} />
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div>
                  <p className="text-2xl font-black text-white tracking-tighter">${product.price.toFixed(2)}</p>
                  <p className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Unit Value</p>
                </div>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded-lg transition-all"
                  title="Delete Product"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold text-xl text-white mb-1">{product.name}</h4>
              <p className="text-xs text-text-muted flex items-center gap-1">
                Ref: #{product.id.toString().padStart(4, '0')}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-muted font-medium">BOM List</span>
                <span className="badge badge-success">{product.materials?.length || 0} Materials</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.materials?.slice(0, 3).map((m: any) => (
                  <span key={m.id} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-text-muted">
                    {m.rawMaterialName}
                  </span>
                ))}
                {(product.materials?.length || 0) > 3 && (
                  <span className="text-[10px] text-indigo-400 font-bold px-1">+{product.materials.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
