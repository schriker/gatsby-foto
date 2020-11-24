import React from "react"
import { PhotoType } from "../../types/photo"
import Masonry from "react-masonry-css"
import styles from "./Gallery.module.css"
import GalleryItem from "./GalleryItem"
import { useDispatch } from "react-redux"
import { openGallery, setPhoto } from "../../store/slices/gallerySlice"
import GalleryLightbox from "./GalleryLightbox"
import { useTypedSelector } from "../../store/rootReducer"

type GalleryPropsTye = {
  photos: PhotoType[]
}

const Gallery: React.FC<GalleryPropsTye> = ({ photos }) => {
  const gallery = useTypedSelector(state => state.gallery)
  const dispatch = useDispatch()
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  }

  const onClickHandler = (photo: PhotoType, index: number) => {
    dispatch(
      openGallery({
        photo,
        index,
      })
    )
  }

  const onPrev = () => {
    const index = (photos.length + gallery.index - 1) % photos.length
    dispatch(setPhoto({ photo: photos[index], index }))
  }

  const onNext = () => {
    const index = (gallery.index + 1) % photos.length
    dispatch(setPhoto({ photo: photos[index], index }))
  }

  return (
    <div className={styles.gallery}>
      <GalleryLightbox next={onNext} prev={onPrev} />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo, index) => (
          <div key={index} onClick={() => onClickHandler(photo, index)}>
            <GalleryItem photo={photo} />
          </div>
        ))}
      </Masonry>
    </div>
  )
}

export default Gallery
