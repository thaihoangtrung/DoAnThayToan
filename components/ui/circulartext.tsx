"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Star } from "lucide-react"

interface CircularTextProps {
  text: string
  spinDuration?: number
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers"
  className?: string
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from: from,
  to: from + 360,
  ease: "linear",
  duration: duration,
  type: "tween",
  repeat: loop ? Number.POSITIVE_INFINITY : 0,
})

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
})

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 2,
  onHover = "speedUp",
  className = "",
}) => {
  const letters = Array.from(text)
  const controls = useAnimation()
  const iconControls = useAnimation()
  const [currentRotation, setCurrentRotation] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    })
  }, [spinDuration, controls, currentRotation])

  const handleHoverStart = () => {
    setIsHovered(true)
    iconControls.start({ rotate: 45, transition: { duration: 0.3 } })

    if (!onHover) return
    switch (onHover) {
      case "slowDown":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration * 2, currentRotation),
        })
        break
      case "speedUp":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration / 4, currentRotation),
        })
        break
      case "pause":
        controls.start({
          rotate: currentRotation,
          scale: 1,
          transition: {
            rotate: { type: "spring", damping: 20, stiffness: 300 },
            scale: { type: "spring", damping: 20, stiffness: 300 },
          },
        })
        break
      case "goBonkers":
        controls.start({
          rotate: currentRotation + 360,
          scale: 0.8,
          transition: getTransition(spinDuration / 20, currentRotation),
        })
        break
      default:
        break
    }
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    iconControls.start({ rotate: 0, transition: { duration: 0.3 } })
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    })
  }

  return (
    <motion.div
      initial={{ rotate: 0 }}
      className={`relative mx-auto rounded-full w-[150px] h-[150px] font-black text-center cursor-pointer origin-center ${className}`}
      animate={controls}
      onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotation = (360 / letters.length) * i
        const factor = Number((Math.PI / letters.length).toFixed(0))
        const x = factor * i
        const y = factor * i
        const transform = `rotateZ(${rotation}deg) translate3d(${x}px, ${y}px, 0)`

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        )
      })}
      <motion.div className="absolute inset-0 flex items-center justify-center" animate={iconControls}>
        <Star className={`w-20 h-20 transition-colors duration-300 bg-black rounded-full p-4 ${isHovered ? "text-yellow-400" : "text-white"}`} />
      </motion.div>
    </motion.div>
  )
}

export default CircularText

