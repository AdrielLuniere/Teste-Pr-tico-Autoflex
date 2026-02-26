import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productionApi } from '../api'

export const fetchSuggestions = createAsyncThunk('production/fetchSuggestions', async () => {
  const response = await productionApi.getSuggestions()
  return response.data
})

const productionSlice = createSlice({
  name: 'production',
  initialState: {
    suggestions: [],
    loading: false,
    error: null,
  } as any,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false
        state.suggestions = action.payload
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default productionSlice.reducer
