import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { stat } from "fs"
import { PhotoType } from "types/photo"

type GalleryStateType = {
  category: string | null
  isOpen: boolean
  photo: PhotoType | null
  index: number
}

const galleryInitialState: GalleryStateType = {
  category: null,
  isOpen: false,
  photo: null,
  index: 0,
}

const gallerySlide = createSlice({
  name: "gallery",
  initialState: galleryInitialState,
  reducers: {
    selectCategory(
      state,
      { payload }: PayloadAction<{ category: string | null }>
    ) {
      state.category =
        typeof payload.category === "string"
          ? payload.category.toLowerCase()
          : payload.category
    },
    closeGallery(state) {
      state.isOpen = false
      state.photo = null
    },
    openGallery(
      state,
      { payload }: PayloadAction<{ photo: PhotoType; index: number }>
    ) {
      state.isOpen = true
      state.photo = payload.photo
      state.index = payload.index
    },
  },
})

export const {
  closeGallery,
  openGallery,
  selectCategory,
} = gallerySlide.actions

export default gallerySlide.reducer
