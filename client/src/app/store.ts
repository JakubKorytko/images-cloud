import { configureStore } from '@reduxjs/toolkit'
import uploadMimeTypeReducer from "../features/uploadMimeType";

export const store = configureStore({
    reducer: {
        uploadMimeType: uploadMimeTypeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch