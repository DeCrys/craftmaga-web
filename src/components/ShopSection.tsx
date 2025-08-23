"use client"

import { Crown, Star, Shield, Sword, Castle } from "lucide-react"

interface VIPPackage {
  id: string
  name: string
  price: string
  icon: any
}

const vipPackages: VIPPackage[] = [
  { id: "6414884", name: "Knight Rank", price: "$3.00", icon: Sword },
  { id: "6824767", name: "Lord Rank", price: "$4.00", icon: Crown },
  { id: "6824769", name: "Paladin Rank", price: "$5.00", icon: Shield },
  { id: "6824773", name: "Duke Rank", price: "$6.00", icon: Castle },
  { id: "6824777", name: "King Rank", price: "$8.00", icon: Star },
]

const ShopSection = () => {
  const openTebex = (packageId: string) => {
    window.open(`https://crafmaga.tebex.io/checkout/packages/add/${packageId}`, "_blank")
  }

  return (
    <section id="shop" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Obchod VIP</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Získej svůj VIP Rank</span>
          </h2>

          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Vyber si svůj VIP rank a získej exkluzivní výhody na našem serveru!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {vipPackages.map((pkg, index) => {
            const Icon = pkg.icon
            return (
              <div
                key={pkg.id}
                className={`group card-glass relative overflow-hidden lg:scale-105`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fade-in-scale 0.6s ease-out both",
                }}
              >
                <div className="relative mb-6 mt-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 mx-auto`}></div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{pkg.name}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">Cena: {pkg.price}</p>
                </div>

                <button
                  onClick={() => openTebex(pkg.id)}
                  className="btn-hero w-full mb-6"
                >
                  Koupit
                </button>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[var(--radius-lg)] pointer-events-none"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ShopSection
