import { configureStore } from '@reduxjs/toolkit'
import componentsVisibilityReducer from '../features/componentsVisibility'
import imagesReducer from '../features/images'

export const store = configureStore({
    reducer: {
        componentsVisibility: componentsVisibilityReducer,
        images: imagesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch