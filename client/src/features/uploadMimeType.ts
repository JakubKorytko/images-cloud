import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UploadMimeTypeState {
    showUploadMimeTypeModal: boolean
}

const initialState: UploadMimeTypeState = {
    showUploadMimeTypeModal: false
}

export const uploadModalSlice = createSlice({
    name: 'uploadMimeType',
    initialState,
    reducers: {
        toggleUploadMimeTypeModal: (state) => {
            state.showUploadMimeTypeModal = !state.showUploadMimeTypeModal
        },
        setUploadMimeTypeModal: (state, action: PayloadAction<boolean>) => {
            state.showUploadMimeTypeModal = action.payload
        },
    },
})

export const { toggleUploadMimeTypeModal, setUploadMimeTypeModal } = uploadModalSlice.actions

export default uploadModalSlice.reducer