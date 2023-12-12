import { configureStore } from '@reduxjs/toolkit'
import uploadMimeTypeReducer from "../features/uploadMimeType";
import uploadModalReducer from "../features/upload";

export const store = configureStore({
    reducer: {
        uploadMimeType: uploadMimeTypeReducer,
        uploadModal: uploadModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch