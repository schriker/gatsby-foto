import React from "react"
import { useSpring, animated } from "react-spring"

const Logo = () => {
  const outerStroke = useSpring({
    x: 0,
    from: { x: 250 },
    config: {
      duration: 1000,
    },
  })

  const insideStroke = useSpring({
    x: 0,
    from: { x: 250 },
    delay: 250,
    config: {
      duration: 1500,
    },
  })

  return (
    <svg width="49" height="50" fill="none" viewBox="0 0 49 50">
      <g clipPath="url(#clip0)">
        <animated.path
          strokeDashoffset={outerStroke.x}
          strokeDasharray="250"
          strokeLinecap="round"
          d="M5 14.5L24.5 4L44 14.5V35.5L24.5 46L5 35.5V14.5Z"
          stroke="black"
          strokeWidth="6"
          fill="none"
        />
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="-10"
          y="3"
          width="69"
          height="80"
        >
          <path
            d="M5.8999 32.0816L24.9455 21.1707L43.9912 32.0816V53.9034L24.9455 64.8142L5.8999 53.9034V32.0816Z"
            fill="none"
            stroke="#C3D836"
            strokeWidth="30"
          />
        </mask>
        <g mask="url(#mask0)">
          <animated.path
            strokeDashoffset={insideStroke.x}
            strokeDasharray="250"
            strokeLinecap="round"
            d="M5.45459 -6.77294L24.5002 -17.6838L43.5459 -6.77294V15.0488L24.5002 25.9597L5.45459 15.0488V-6.77294Z"
            stroke="black"
            strokeWidth="6"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="49" height="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Logo
