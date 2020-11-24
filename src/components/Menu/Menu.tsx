import React, { useState, useRef } from "react"
import { useSpring, animated } from "react-spring"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./Menu.module.css"
import { CategoryType } from "../../types/photo"
import { useDispatch } from "react-redux"
import { selectCategory } from "../../store/slices/gallerySlice"

type MenuQueryType = {
  strapi: {
    categories: CategoryType[]
  }
}

const Menu = () => {
  const {
    strapi: { categories },
  } = useStaticQuery<MenuQueryType>(graphql`
    {
      strapi {
        categories {
          name
        }
      }
    }
  `)
  const dispatch = useDispatch()
  const liRef = useRef<HTMLLIElement>(null!)
  const [clickedIndex, setClickedIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState(0)
  const [props, set] = useSpring(() => ({
    transform: "translateY(0px)",
    color: "#000",
    config: {
      duration: 200,
    },
  }))

  const onMouseOverHandler = (index: number) => {
    setHoverIndex(index)
    set({
      transform: `translateY(${index * liRef.current.clientHeight}px)`,
      color: "#fff",
    })
  }

  const onClickHandler = (index: number, name: string) => {
    setClickedIndex(index)
    set({
      transform: `translateY(${index * liRef.current.clientHeight}px)`,
      color: "#fff",
    })
    dispatch(selectCategory({ category: name === "Wszystkie" ? null : name }))
  }

  const onMouseOutHandler = () => {
    setHoverIndex(clickedIndex)
    set({
      transform: `translateY(${clickedIndex * liRef.current.clientHeight}px)`,
      color: "#fff",
    })
  }

  return (
    <div className={styles.menu}>
      <h2>Kategorie</h2>
      <ul>
        <animated.div
          style={{ transform: props.transform }}
          className={styles.active}
        ></animated.div>
        {[{ name: "Wszystkie" }, ...categories].map((category, index) => (
          <li
            ref={liRef}
            className={index === hoverIndex ? styles.white : ""}
            onClick={() => onClickHandler(index, category.name)}
            onMouseOut={onMouseOutHandler}
            onMouseOver={() => onMouseOverHandler(index)}
            key={index}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
