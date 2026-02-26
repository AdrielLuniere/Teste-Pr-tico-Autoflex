import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { inventoryApi } from '../api'

export const fetchProducts = createAsyncThunk('inventory/fetchProducts', async (page: number) => {
  const response = await inventoryApi.getProducts(page)
  return response.data
})

export const fetchMaterials = createAsyncThunk('inventory/fetchMaterials', async (page: number) => {
  const response = await inventoryApi.getMaterials(page)
  return response.data
})

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    products: [],
    materials: [],
    loading: false,
    error: null,
  } as any,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.content
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.materials = action.payload.content
      })
  },
})

export default inventorySlice.reducer
