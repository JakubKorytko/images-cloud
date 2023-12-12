import { createSlice } from '@reduxjs/toolkit'

export interface UploadModalState {
    showUploadModal: boolean
}

const initialState: UploadModalState = {
    showUploadModal: false
}

export const uploadModalSlice = createSlice({
    name: 'uploadMimeType',
    initialState,
    reducers: {
        toggleUploadModal: (state) => {
            state.showUploadModal = !state.showUploadModal
        },
    }
});


export const { toggleUploadModal } = uploadModalSlice.actions

export default uploadModalSlice.reducer
