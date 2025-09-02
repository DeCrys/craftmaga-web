'use client'

import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import GameModesSection from "@/components/GameModesSection"
import TeamSection from "@/components/TeamSection"
import VotingSection from "@/components/VotingSection"
import ShopSection from "@/components/ShopSection"
import DynmapSection from "@/components/DynmapSection"
import Footer from "@/components/Footer"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function Index() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo')
    if (scrollTo) {
      const el = document.getElementById(scrollTo)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50)
      }
    }
  }, [searchParams])

  return (
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
  )
}