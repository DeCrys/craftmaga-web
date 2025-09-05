'use client'

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import GameModesSection from "@/components/GameModesSection"
import TeamSection from "@/components/TeamSection"
import VotingSection from "@/components/VotingSection"
import ShopSection from "@/components/ShopSection"
import DynmapSection from "@/components/DynmapSection"
import Footer from "@/components/Footer"

// UI komponenty
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Pokud budeš chtít Routes (React Router), musí být taky v client component
import { Routes, Route } from "react-router-dom"

const queryClient = new QueryClient()

export default function HomePageClient() {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams) {
      const scrollTo = searchParams.get('scrollTo')
      if (scrollTo) {
        const el = document.getElementById(scrollTo)
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50)
        }
      }
    }
  }, [searchParams])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster /> {/* Globální toaster */}
        <div className="min-h-screen">
          <Navigation />
          <main>
            <section id="domu">
              <HeroSection />
            </section>
            <section id="mody">
              <GameModesSection />
            </section>
            <section id="tym">
              <TeamSection />
            </section>
            <section id="hlasovani">
              <VotingSection />
            </section>
            <section id="shop">
              <ShopSection />
            </section>
            <section id="dynmap">
              <DynmapSection />
            </section>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
