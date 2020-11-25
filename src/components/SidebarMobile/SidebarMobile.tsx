import React from "react"
import styles from "./SidebarMobile.module.css"
import Menu from "../Menu/Menu"
import Social from "../Social/Social"
import { useTypedSelector } from "../../store/rootReducer"
import { useSpring, animated } from "react-spring"
import { useDispatch } from "react-redux"
import { toggleMobileMenu } from "../../store/slices/gallerySlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const Sidebar = () => {
  const dispatch = useDispatch()
  const isMenuOpen = useTypedSelector(state => state.gallery.mobileMenuOpen)
  const slide = useSpring({ left: isMenuOpen ? "0px" : "-270px" })
  const hide = useSpring({
    opacity: isMenuOpen ? "1" : "0",
    display: isMenuOpen ? "block" : "none",
  })

  return (
    <>
      <animated.div style={slide} className={styles.wrapper}>
        <button
          className={styles.closeButton}
          onClick={() => dispatch(toggleMobileMenu())}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Menu />
        <Social />
      </animated.div>
      <animated.button
        onClick={() => dispatch(toggleMobileMenu())}
        style={hide}
        className={styles.backDrop}
      ></animated.button>
    </>
  )
}

export default Sidebar
