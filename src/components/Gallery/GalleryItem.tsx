import React from "react"
import { PhotoType } from "../../types/photo"
import Img from "gatsby-image"
import styles from "./GalleryItem.module.css"

const GalleryItem: React.FC<{ photo: PhotoType }> = ({ photo }) => {
  return (
    <div className={styles.galleryItem}>
      <Img
        fadeIn={true}
        fluid={photo.file.imageFile.childImageSharp.fluid}
      />
    </div>
  )
}

export default GalleryItem
