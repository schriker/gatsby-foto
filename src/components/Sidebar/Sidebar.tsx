import React from "react"
import styles from "./Sidebar.module.css"
import Logo from "../Logo/Logo"
import Menu from "../Menu/Menu"
import Social from "../Social/Social";

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Menu />
      <Social />
    </div>
  )
}

export default Sidebar
