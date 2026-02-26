import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMaterials } from '../store/inventorySlice'
import { inventoryApi } from '../api'
import { RootState, AppDispatch } from '../store'
import { Plus, Boxes, X, HardDrive, AlertTriangle, Trash2 } from 'lucide-react'

const Materials = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { materials } = useSelector((state: RootState) => state.inventory)
  const [showAdd, setShowAdd] = useState(false)
  const [newMaterial, setNewMaterial] = useState({ name: '', stockQuantity: '' })

  useEffect(() => {
    dispatch(fetchMaterials(0))
  }, [dispatch])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    await inventoryApi.saveMaterial({
      ...newMaterial,
      stockQuantity: Number(newMaterial.stockQuantity)
    })
    setShowAdd(false)
    dispatch(fetchMaterials(0))
    setNewMaterial({ name: '', stockQuantity: '' })
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await inventoryApi.deleteMaterial(id)
        dispatch(fetchMaterials(0))
      } catch (error) {
        alert('Cannot delete material: It is being used by one or more products.')
      }
    }
  }

  return (
    <div className="container space-y-8 animate-in" style={{ paddingBottom: '3rem' }}>
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Inventory</h1>
          <p className="text-text-muted">Monitor and resupply your primary raw materials.</p>
        </div>
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} className="btn btn-primary">
            <Plus size={20} /> New Material
          </button>
        )}
      </header>

      {showAdd && (
        <div className="animate-in">
          <form onSubmit={handleSave} className="card space-y-6 bg-white/5 border-indigo-500/20 max-w-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <HardDrive className="text-indigo-400" size={20} />
                Entry Protocol
              </h3>
              <button type="button" onClick={() => setShowAdd(false)} className="text-text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Resource Name</label>
                <input 
                  type="text"
                  placeholder="Ex: Lithium, Steel Alloy..." 
                  className="input" 
                  required
                  value={newMaterial.name}
                  onChange={e => setNewMaterial({...newMaterial, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Quantity Received</label>
                <input 
                  placeholder="0" 
                  type="number" 
                  className="input" 
                  required
                  value={newMaterial.stockQuantity}
                  onChange={e => setNewMaterial({...newMaterial, stockQuantity: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button type="button" onClick={() => setShowAdd(false)} className="btn text-white hover:bg-white/5">Discard</button>
              <button type="submit" className="btn btn-primary px-8">Confirm Entry</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {materials.map((material: any) => (
          <div key={material.id} className="card relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${material.stockQuantity > 5 ? 'bg-success' : 'bg-danger'}`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${material.stockQuantity > 5 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                <Boxes size={24} />
              </div>
              <div className="flex gap-2">
                {material.stockQuantity <= 5 && (
                  <div className="text-rose-400 animate-pulse">
                    <AlertTriangle size={20} />
                  </div>
                )}
                <button 
                  onClick={() => handleDelete(material.id)}
                  className="p-2 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded-lg transition-all"
                  title="Delete Material"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-1">Stock ID: #{material.id}</p>
              <h4 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors uppercase">{material.name}</h4>
            </div>

            <div className="flex items-end justify-between mt-auto">
              <div>
                <p className="text-3xl font-black text-white tracking-tighter">{material.stockQuantity}</p>
                <p className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Units Available</p>
              </div>
            </div>
          </div>
        ))}
        {materials.length === 0 && (
          <div className="col-span-full card text-center py-20 border-2 border-dashed border-white/5">
            <Boxes className="mx-auto text-white/5 mb-4" size={64} />
            <p className="text-text-muted">Inventory is empty. Start by adding your first material.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Materials
