"use client"
import { cn } from "../../lib/utils"
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

      

      {children}

      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none h-32"
      ></div>
    </div>
  )
}


// zaloha


  