import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const inventoryApi = {
  getProducts: (page = 0) => api.get(`/inventory/products?page=${page}&size=10`),
  saveProduct: (product: any) => api.post('/inventory/products', product),
  getMaterials: (page = 0) => api.get(`/inventory/materials?page=${page}&size=10`),
  saveMaterial: (material: any) => api.post('/inventory/materials', material),
  deleteProduct: (id: number) => api.delete(`/inventory/products/${id}`),
  deleteMaterial: (id: number) => api.delete(`/inventory/materials/${id}`),
}

export const productionApi = {
  getSuggestions: () => api.get('/production/suggestions'),
}

export default api
