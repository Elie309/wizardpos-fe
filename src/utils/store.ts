import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice.ts'
import orderReducer from './Slices/orderSlice.ts'

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch