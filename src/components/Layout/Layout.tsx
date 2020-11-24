import React from "react"
import styles from "./Layout.module.css"
import "normalize.css"
import "./global.css"
import Sidebar from "../Sidebar/Sidebar"

type LayoutPropsType = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
