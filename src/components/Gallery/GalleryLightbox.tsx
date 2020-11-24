import React, { useEffect, useState } from "react"
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

type GalleryLightboxPropsType = {
  next: () => void
  prev: () => void
}

const GalleryLightbox: React.FC<GalleryLightboxPropsType> = ({
  next,
  prev,
}) => {
  const dispatch = useDispatch()
  const [pressedKey, setKey] = useState<KeyboardEvent | null>(null)
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

  useEffect(() => {
    const onKeyDownHandler = (event: KeyboardEvent) => {
      if (!pressedKey) {
        setKey(event)
      }
    }
    const onKeyUpHandler = () => {
      console.log(pressedKey)
      if (pressedKey?.code === "ArrowRight" || pressedKey?.code === "Space") {
        next()
      }
      if (pressedKey?.code === "ArrowLeft") {
        prev()
      }
      if (pressedKey?.code === "Escape") {
        dispatch(closeGallery())
      }
      setKey(null)
    }
    window.addEventListener("keydown", onKeyDownHandler)
    window.addEventListener("keyup", onKeyUpHandler)
    return () => {
      window.removeEventListener("keydown", onKeyDownHandler)
      window.removeEventListener("keyup", onKeyUpHandler)
    }
  }, [pressedKey])

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
                <button onClick={prev}>
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
                <button onClick={next}>
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
