import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ComponentsVisibilityState {
    showUploadMimeTypeModal: boolean,
    showUploadModal: boolean,
    showProgressModal: boolean,
    showImageEditor: boolean,
    showMenu: boolean,
    showCarousel: boolean,
    showDeleteModal: boolean
}

const initialState: ComponentsVisibilityState = {
    showUploadMimeTypeModal: false,
    showUploadModal: false,
    showProgressModal: false,
    showImageEditor: false,
    showMenu: false,
    showCarousel: false,
    showDeleteModal: false
}

export const componentsVisibilitySlice = createSlice({
    name: 'componentsVisibility',
    initialState,
    reducers: {
        setShowUploadMimeTypeModal: (state, action: PayloadAction<boolean>) => {
            state.showUploadMimeTypeModal = action.payload
        },
        setShowUploadModal: (state, action: PayloadAction<boolean>) => {
            state.showUploadModal = action.payload
        },
        setShowProgressModal: (state, action: PayloadAction<boolean>) => {
            state.showProgressModal = action.payload
        },
        setShowImageEditor: (state, action: PayloadAction<boolean>) => {
            state.showImageEditor = action.payload
        },
        setShowMenu: (state, action: PayloadAction<boolean>) => {
            state.showMenu = action.payload
        },
        setShowCarousel: (state, action: PayloadAction<boolean>) => {
            state.showCarousel = action.payload
        },
        setShowDeleteModal: (state, action: PayloadAction<boolean>) => {
            state.showDeleteModal = action.payload
        }
    },
})

export const { setShowUploadMimeTypeModal, setShowUploadModal, setShowProgressModal, setShowImageEditor, setShowMenu, setShowCarousel, setShowDeleteModal } = componentsVisibilitySlice.actions

export default componentsVisibilitySlice.reducer
