import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UploadMimeTypeState {
    showUploadMimeTypeModal: boolean
}

const initialState: UploadMimeTypeState = {
    showUploadMimeTypeModal: false
}

export const uploadModalMimeTypeSlice = createSlice({
    name: 'uploadMimeType',
    initialState,
    reducers: {
        setUploadMimeTypeModal: (state, action: PayloadAction<boolean>) => {
            state.showUploadMimeTypeModal = action.payload
        },
    },
})

export const { setUploadMimeTypeModal } = uploadModalMimeTypeSlice.actions

export default uploadModalMimeTypeSlice.reducer