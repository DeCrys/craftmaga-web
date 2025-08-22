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
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
      blockType: "grass",
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
      blockType: "stone",
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      blockType: "dirt",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
      blockType: "cobblestone",
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      blockType: "wood",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      blockType: "diamond",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      blockType: "emerald",
    },
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
      className={cn("h-screen relative flex items-center w-full justify-center overflow-hidden", className)}
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
            y: [orb.y, orb.y - 50, orb.y],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none h-32"
        style={{
        }}
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
      initialX?: number
      translateX?: number
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
  const [collision, setCollision] = useState<{
    detected: boolean
    coordinates: { x: number; y: number } | null
  }>({
    detected: false,
    coordinates: null,
  })
  const [beamKey, setBeamKey] = useState(0)
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false)

  const getBlockTextures = (blockType = "grass") => {
    const blockTextures = {
      grass: {
        top: "linear-gradient(45deg, #7CB342 25%, #8BC34A 25%, #8BC34A 50%, #7CB342 50%, #7CB342 75%, #8BC34A 75%)",
        side: "linear-gradient(45deg, #8D6E63 25%, #A1887F 25%, #A1887F 50%, #8D6E63 50%, #8D6E63 75%, #A1887F 75%)",
        front: "linear-gradient(0deg, #8D6E63 0%, #8D6E63 75%, #7CB342 75%, #8BC34A 100%)",
      },
      stone: {
        top: "linear-gradient(45deg, #9E9E9E 25%, #BDBDBD 25%, #BDBDBD 50%, #9E9E9E 50%, #9E9E9E 75%, #BDBDBD 75%)",
        side: "linear-gradient(45deg, #757575 25%, #9E9E9E 25%, #9E9E9E 50%, #757575 50%, #757575 75%, #9E9E9E 75%)",
        front: "linear-gradient(45deg, #757575 25%, #9E9E9E 25%, #9E9E9E 50%, #757575 50%, #757575 75%, #9E9E9E 75%)",
      },
      dirt: {
        top: "linear-gradient(45deg, #8D6E63 25%, #A1887F 25%, #A1887F 50%, #8D6E63 50%, #8D6E63 75%, #A1887F 75%)",
        side: "linear-gradient(45deg, #6D4C41 25%, #8D6E63 25%, #8D6E63 50%, #6D4C41 50%, #6D4C41 75%, #8D6E63 75%)",
        front: "linear-gradient(45deg, #6D4C41 25%, #8D6E63 25%, #8D6E63 50%, #6D4C41 50%, #6D4C41 75%, #8D6E63 75%)",
      },
      cobblestone: {
        top: "radial-gradient(circle at 25% 25%, #9E9E9E 20%, #757575 40%, #616161 60%)",
        side: "radial-gradient(circle at 75% 25%, #757575 20%, #616161 40%, #424242 60%)",
        front: "radial-gradient(circle at 50% 75%, #757575 20%, #616161 40%, #424242 60%)",
      },
      wood: {
        top: "radial-gradient(ellipse at center, #8D6E63 30%, #6D4C41 70%)",
        side: "linear-gradient(0deg, #8D6E63 0%, #A1887F 20%, #8D6E63 40%, #A1887F 60%, #8D6E63 80%, #A1887F 100%)",
        front: "linear-gradient(0deg, #6D4C41 0%, #8D6E63 20%, #6D4C41 40%, #8D6E63 60%, #6D4C41 80%, #8D6E63 100%)",
      },
      diamond: {
        top: "linear-gradient(45deg, #4FC3F7 25%, #81D4FA 25%, #81D4FA 50%, #4FC3F7 50%, #4FC3F7 75%, #81D4FA 75%)",
        side: "linear-gradient(45deg, #29B6F6 25%, #4FC3F7 25%, #4FC3F7 50%, #29B6F6 50%, #29B6F6 75%, #4FC3F7 75%)",
        front: "linear-gradient(45deg, #0288D1 25%, #29B6F6 25%, #29B6F6 50%, #0288D1 50%, #0288D1 75%, #29B6F6 75%)",
      },
      emerald: {
        top: "linear-gradient(45deg, #66BB6A 25%, #81C784 25%, #81C784 50%, #66BB6A 50%, #66BB6A 75%, #81C784 75%)",
        side: "linear-gradient(45deg, #4CAF50 25%, #66BB6A 25%, #66BB6A 50%, #4CAF50 50%, #4CAF50 75%, #66BB6A 75%)",
        front: "linear-gradient(45deg, #388E3C 25%, #4CAF50 25%, #4CAF50 50%, #388E3C 50%, #388E3C 75%, #4CAF50 75%)",
      },
    }
    return blockTextures[blockType as keyof typeof blockTextures] || blockTextures.grass
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

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          })
          setCycleCollisionDetected(true)
        }
      }
    }

    const animationInterval = setInterval(checkCollision, 50)

    return () => clearInterval(animationInterval)
  }, [cycleCollisionDetected, containerRef])

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null })
        setCycleCollisionDetected(false)
      }, 2000)

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1)
      }, 2000)
    }
  }, [collision])

  const blockTextures = getBlockTextures(beamOptions.blockType)

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className="absolute left-0 top-20 m-auto"
        style={{
          width: "16px",
          height: "16px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top face */}
        <div
          className="absolute w-4 h-4"
          style={{
            background: blockTextures.top,
            backgroundSize: "4px 4px",
            transform: "rotateX(90deg) translateZ(8px)",
            border: "1px solid rgba(0,0,0,0.4)",
            boxShadow: "inset 0 0 2px rgba(255,255,255,0.3)",
          }}
        />
        {/* Front face */}
        <div
          className="absolute w-4 h-4"
          style={{
            background: blockTextures.front,
            backgroundSize: "4px 4px",
            transform: "translateZ(8px)",
            border: "1px solid rgba(0,0,0,0.4)",
            boxShadow: "inset 0 0 2px rgba(255,255,255,0.2)",
          }}
        />
        {/* Right face */}
        <div
          className="absolute w-4 h-4"
          style={{
            background: blockTextures.side,
            backgroundSize: "4px 4px",
            transform: "rotateY(90deg) translateZ(8px)",
            border: "1px solid rgba(0,0,0,0.4)",
            boxShadow: "inset 0 0 2px rgba(0,0,0,0.2)",
          }}
        />
      </motion.div>
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            blockType={beamOptions.blockType}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
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
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }))

  const getBlockColors = (blockType = "grass") => {
    const blockColors = {
      grass: { primary: "#7CB342", secondary: "#8D6E63" },
      stone: { primary: "#9E9E9E", secondary: "#757575" },
      dirt: { primary: "#8D6E63", secondary: "#6D4C41" },
      cobblestone: { primary: "#757575", secondary: "#616161" },
      wood: { primary: "#8D6E63", secondary: "#6D4C41" },
      diamond: { primary: "#4FC3F7", secondary: "#29B6F6" },
      emerald: { primary: "#66BB6A", secondary: "#4CAF50" },
    }
    return blockColors[blockType as keyof typeof blockColors] || blockColors.grass
  }

  const blockColors = getBlockColors(blockType)

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full blur-sm"
        style={{
          background: `linear-gradient(to right, transparent, ${blockColors.primary}, transparent)`,
        }}
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1"
          style={{
            background: `linear-gradient(135deg, ${blockColors.primary}, ${blockColors.secondary})`,
            border: "0.5px solid rgba(0,0,0,0.3)",
          }}
        />
      ))}
    </div>
  )
}
