'use client'

import Navigation from "../src/components/Navigation"
import HeroSection from "../src/components/HeroSection"
import GameModesSection from "../src/components/GameModesSection"
import TeamSection from "../src/components/TeamSection"
import VotingSection from "../src/components/VotingSection"
import ShopSection from "../src/components/ShopSection"
import DynmapSection from "../src/components/DynmapSection"
import Footer from "../src/components/Footer"
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