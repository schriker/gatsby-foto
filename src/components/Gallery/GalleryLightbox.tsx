import React from "react"
import styles from "./GalleryLightbox.module.css"
import { useTypedSelector } from "../../store/rootReducer"
import { animated, useTransition } from "react-spring"
import useBodyClass from "../../hooks/useBodyClass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { closeGallery } from "../../store/slices/gallerySlice"
import Img from "gatsby-image"

const GalleryLightbox = () => {
  const dispatch = useDispatch()
  const gallery = useTypedSelector(state => state.gallery)
  const exif = gallery.photo?.file.imageFile.fields.exif
  useBodyClass("hide-overflow", gallery.isOpen)
  const transitions = useTransition(gallery.isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  })
  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={styles.lightbox}>
              <div className={styles.topBar}>
                <div className={styles.photoInfo}>
                  <h3>{gallery.photo?.title}</h3>
                  <span>{exif?.camera}</span>
                  <span>f/{exif?.fstop}</span>
                  <span>{exif?.exposure}</span>
                  <span>ISO {exif?.iso}</span>
                  <span>obiektyw - {exif?.lens}</span>
                </div>
                <button
                  onClick={() => dispatch(closeGallery())}
                  className={styles.close}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.content}>
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className={styles.photo}>
                  {gallery.photo && (
                    <img
                      src={
                        gallery.photo.file.imageFile.childImageSharp.fluid.src
                      }
                      alt=""
                    />
                  )}
                </div>
                <button>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </animated.div>
          )
      )}
    </>
  )
}

export default GalleryLightbox
