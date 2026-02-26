import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Boxes, Factory } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/products', label: 'Products', icon: <Package size={18} /> },
    { path: '/materials', label: 'Raw Materials', icon: <Boxes size={18} /> },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-indigo-400 font-black text-2xl tracking-tighter">
          <Factory size={28} />
          <span>AUTOFLEX<span className="text-white/50 font-light">PRO</span></span>
        </Link>
        
        <div className="flex gap-2">
          {navItems.map(item => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === item.path 
                  ? 'bg-indigo-500/10 text-pearl border border-indigo-500/20' 
                  : 'text-pearl-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
