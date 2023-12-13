import { configureStore } from '@reduxjs/toolkit'
import componentsVisibilityReducer from '../features/componentsVisibility'

export const store = configureStore({
    reducer: {
        componentsVisibility: componentsVisibilityReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch