import React from "react"
import styles from "./Social.module.css"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Social = () => {
  return (
    <div className={styles.social}>
      <a target="_blank" href="https://www.instagram.com/marcinjanus/">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  )
}

export default Social
