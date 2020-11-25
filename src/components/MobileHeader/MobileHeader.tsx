import Logo from "../Logo/Logo"
import logo from "../../images/logo.png"
import React from "react"
import styles from "./MobileHeader.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { toggleMobileMenu } from "../../store/slices/gallerySlice"

const MobileHeader = () => {
  const dispatch = useDispatch()

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => dispatch(toggleMobileMenu())}
        className={styles.social}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <img width="35px" src={logo} alt="" />
      <a
        className={styles.social}
        target="_blank"
        href="https://www.instagram.com/marcinjanus/"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  )
}

export default MobileHeader
