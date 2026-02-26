import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuggestions } from '../store/productionSlice'
import { RootState, AppDispatch } from '../store'
import { RefreshCcw, TrendingUp, Info, AlertCircle } from 'lucide-react'

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { suggestions, loading } = useSelector((state: RootState) => state.production)

  useEffect(() => {
    dispatch(fetchSuggestions())
  }, [dispatch])

  const totalValue = suggestions.reduce((sum: number, s: any) => sum + ((s.unitPrice || 0) * (s.suggestedQuantity || 0)), 0)

  return (
    <div className="container space-y-8 animate-in" style={{ paddingBottom: '3rem' }}>
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Production Intelligence</h1>
          <p className="text-text-muted flex items-center gap-2">
            <Info size={16} />
            Prioritized by unit price to maximize revenue.
          </p>
        </div>
        <button 
          onClick={() => dispatch(fetchSuggestions())} 
          disabled={loading}
          className="btn btn-primary"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Analyzing...' : 'Refresh Analysis'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white/90 px-2">Recommended Build Orders</h3>
          <div className="grid gap-4">
            {suggestions.map((s: any) => (
              <div key={s.productId} className="card flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">{s.productName}</h4>
                    <div className="flex gap-2 mt-1">
                      {s.suggestedQuantity > 0 ? (
                        <span className="badge badge-success">Ready to Produce</span>
                      ) : (
                        <span className="badge badge-danger">Out of Stock</span>
                      )}
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        Price: ${Number(s.unitPrice || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Target Units</p>
                    <p className="text-3xl font-black text-white">{s.suggestedQuantity}</p>
                  </div>
                </div>
              </div>
            ))}
            {suggestions.length === 0 && !loading && (
              <div className="card text-center py-12">
                <p className="text-text-muted">No products found. Add products and materials to see suggestions.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white/90 px-2">Financial Impact</h3>
          <div className="card bg-indigo-600/10 border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
            <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-2">Estimated Total Value</p>
            <p className="text-5xl font-black text-white tracking-tighter">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5 flex gap-3">
              <AlertCircle className="text-indigo-400 shrink-0" size={20} />
              <p className="text-xs text-indigo-100/70 leading-relaxed">
                This projection accounts for current inventory levels and prioritization rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
