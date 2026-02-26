import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './inventorySlice'
import productionReducer from './productionSlice'

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    production: productionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
