import React from "react"
import styles from "./Layout.module.css"
import "normalize.css"
import "./global.css"
import Sidebar from "../Sidebar/Sidebar"
import SidebarMobile from "../SidebarMobile/SidebarMobile"
import MobileHeader from "../MobileHeader/MobileHeader"
import useViewWidth from "../../hooks/useViewWidth"

type LayoutPropsType = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  const viewWidth = useViewWidth()

  return (
    <div className={styles.wrapper}>
      {viewWidth < 768 ? <SidebarMobile /> : <Sidebar />}
      <MobileHeader />
      <div>{children}</div>
    </div>
  )
}

export default Layout
