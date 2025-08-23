"use client"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import React, { useRef, useState, useEffect } from "react"

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  const beams = [
    { duration: 7, repeatDelay: 3, delay: 2, blockType: "grass" },
    { duration: 3, repeatDelay: 3, delay: 4, blockType: "stone" },
    { duration: 7, repeatDelay: 7, blockType: "dirt" },
    { duration: 5, repeatDelay: 14, delay: 4, blockType: "cobblestone" },
    { duration: 11, repeatDelay: 2, blockType: "wood" },
    { duration: 4, repeatDelay: 2, blockType: "diamond" },
    { duration: 6, repeatDelay: 4, delay: 2, blockType: "emerald" },
  ]

  const orbs = [
    { x: 100, y: 200, size: 60, delay: 0 },
    { x: 300, y: 400, size: 40, delay: 2 },
    { x: 800, y: 150, size: 80, delay: 1 },
    { x: 1100, y: 350, size: 50, delay: 3 },
    { x: 200, y: 600, size: 70, delay: 1.5 },
  ]

  return (
    <div
      ref={parentRef}
      className={cn("h-screen relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(ellipse at top, hsl(260 85% 60% / 0.3) 0%, hsl(225 15% 8%) 50%), 
                     linear-gradient(135deg, hsl(225 15% 8%) 0%, hsl(260 85% 45% / 0.2) 50%, hsl(225 15% 8%) 100%)`,
      }}
    >
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-xl"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `fixed linear-gradient(135deg, hsl(260 85% 60% / 0.3) 0%, hsl(280 75% 70% / 0.2) 100%)`,
          }}
          animate={{
            top: [orb.y, orb.y - 50, orb.y],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {beams.map((beam, idx) => (
        <CollisionMechanism
          key={idx}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}

      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none h-32"
      ></div>
    </div>
  )
}

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>
    parentRef: React.RefObject<HTMLDivElement>
    beamOptions?: {
      initialY?: number
      translateY?: number
      rotate?: number
      className?: string
      duration?: number
      delay?: number
      repeatDelay?: number
      blockType?: string
    }
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null)
  const [collision, setCollision] = useState<{ detected: boolean; coordinates: { x: number; y: number } | null }>({ detected: false, coordinates: null })
  const [beamKey, setBeamKey] = useState(0)
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false)

  const getBlockTextures = (blockType = "grass") => {
    const blockTextures: any = {
      grass: { top: "#7CB342", side: "#8D6E63", front: "#8BC34A" },
      stone: { top: "#BDBDBD", side: "#757575", front: "#9E9E9E" },
      dirt: { top: "#A1887F", side: "#6D4C41", front: "#8D6E63" },
      cobblestone: { top: "#9E9E9E", side: "#616161", front: "#757575" },
      wood: { top: "#8D6E63", side: "#A1887F", front: "#6D4C41" },
      diamond: { top: "#4FC3F7", side: "#29B6F6", front: "#0288D1" },
      emerald: { top: "#66BB6A", side: "#4CAF50", front: "#388E3C" },
    }
    return blockTextures[blockType] || blockTextures.grass
  }

  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
        const beamRect = beamRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        const parentRect = parentRef.current.getBoundingClientRect()

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2
          const relativeY = beamRect.bottom - parentRect.top

          setCollision({ detected: true, coordinates: { x: relativeX, y: relativeY } })
          setCycleCollisionDetected(true)
        }
      }
    }

    const animationInterval = setInterval(checkCollision, 50)
    return () => clearInterval(animationInterval)
  }, [cycleCollisionDetected, containerRef])

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => { setCollision({ detected: false, coordinates: null }); setCycleCollisionDetected(false) }, 2000)
      setTimeout(() => { setBeamKey((prev) => prev + 1) }, 2000)
    }
  }, [collision])

  const blockTextures = getBlockTextures(beamOptions.blockType)
  const parentWidth = parentRef.current?.offsetWidth || 800
  const blockWidth = 16
  const initialX = Math.random() * (parentWidth - blockWidth)
  const translateX = initialX

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        initial={{ top: beamOptions.initialY || -200, left: initialX, rotate: beamOptions.rotate || 0 }}
        animate={{ top: beamOptions.translateY || 1800, left: translateX, rotate: beamOptions.rotate || 0 }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className="absolute"
        style={{ width: blockWidth, height: blockWidth, transformStyle: "preserve-3d" }}
      >
        <div style={{ background: blockTextures.top, width: blockWidth, height: blockWidth }} />
      </motion.div>

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            blockType={beamOptions.blockType}
            style={{
              left: collision.coordinates.x,
              top: collision.coordinates.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
})

CollisionMechanism.displayName = "CollisionMechanism"

const Explosion = ({ blockType = "grass", ...props }: React.HTMLProps<HTMLDivElement> & { blockType?: string }) => {
  const spans = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 0,
    y: 0,
    directionX: Math.random() * 80 - 40,
    directionY: Math.random() * -50 - 10,
  }))

  const blockColors: any = {
    grass: { primary: "#7CB342", secondary: "#8D6E63" },
    stone: { primary: "#9E9E9E", secondary: "#757575" },
    dirt: { primary: "#8D6E63", secondary: "#6D4C41" },
    cobblestone: { primary: "#757575", secondary: "#616161" },
    wood: { primary: "#8D6E63", secondary: "#6D4C41" },
    diamond: { primary: "#4FC3F7", secondary: "#29B6F6" },
    emerald: { primary: "#66BB6A", secondary: "#4CAF50" },
  }

  const colors = blockColors[blockType] || blockColors.grass

  return (
    <div {...props} className="absolute z-50 h-2 w-2">
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.x, y: span.y, opacity: 1 }}
          animate={{ x: span.directionX, y: span.directionY, opacity: 0 }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, border: "0.5px solid rgba(0,0,0,0.3)" }}
        />
      ))}
    </div>
  )
}
