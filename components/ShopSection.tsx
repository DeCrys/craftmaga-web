'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from "@/hooks/use-local-storage"

// Definice VIPPackage
interface VIPPackage {
  id: string
  name: string
  priceCZK: number
  icon: string // nyní string pro obrázek
}

// Seznam balíčků
const vipPackages: VIPPackage[] = [
  { id: '6414884', name: 'VIP Rank', priceCZK: 70, icon: '/icons/vip.png' },
  { id: '6824767', name: 'LEGEND Rank', priceCZK: 90, icon: '/icons/legend.png' },
  { id: '6824769', name: 'ULTRA Rank', priceCZK: 110, icon: '/icons/ultra.png' },
  { id: '6824773', name: 'GOD Rank', priceCZK: 130, icon: '/icons/god.png' },
  { id: '6824777', name: 'IMMORTAL Rank', priceCZK: 170, icon: '/icons/immortal.png' },
]

export default function ShopSection() {
  const [username, setUsername] = useLocalStorage<string | null>('nick', null)
  const [skinUrl, setSkinUrl] = useLocalStorage<string | null>('skinUrl', null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isLoggedIn = !!username

  const handleCheckout = async (pkg: VIPPackage) => {
    if (!username) {
      alert('Nejdříve se prosím přihlas svým Minecraft nickem v navigaci.')
      return
    }

    try {
      setLoadingId(pkg.id)
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: pkg.id, pkgName: pkg.name, username }),
      })

      if (!res.ok) throw new Error('Chyba při vytváření platby')
      const data = await res.json()

      window.location.href = data.url
    } catch (e) {
      console.error(e)
      alert('Platbu se nepodařilo inicializovat. Zkus to znovu.')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <section id="shop" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Obchod VIP</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Získej svůj VIP Rank</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Zadej svůj Minecraft nick, vyber balíček a zaplať v CZK přes zabezpečenou bránu Stripe.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12 flex flex-col gap-3">
          {!isMounted ? (
            <div className="text-center gradient-text">
              Přihlas se prosím svým Minecraft nickem v navigaci.
            </div>
          ) : !isLoggedIn ? (
            <div className="text-center gradient-text">
              Přihlas se prosím svým Minecraft nickem v navigaci.
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-center text-lg text-secondary/80">
              {skinUrl && (
                <img
                  src={skinUrl}
                  alt={username || ''}
                  className="w-8 h-8 rounded-full"
                />
              )}
              Jsi přihlášen jako <span className="font-bold text-red-500">{username}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {vipPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group card-glass relative overflow-hidden lg:scale-105`}
              style={{ animationDelay: `${index * 0.1}s`, animation: 'fade-in-scale 0.6s ease-out both' }}
            >
              <div className="relative mb-6 mt-6">
                <div className="w-25 h-25 rounded-2xl from-primary to-secondary p-4 mx-auto overflow-hidden">
                  <img
                    src={pkg.icon}
                    alt={pkg.name}
                    className="max-w-[100px] max-h-[100px] mx-auto my-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{pkg.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed">Cena: {pkg.priceCZK.toLocaleString('cs-CZ')} Kč</p>
              </div>

              <button
                onClick={() => handleCheckout(pkg)}
                className="btn-hero w-full mb-6"
                disabled={loadingId === pkg.id}
              >
                {loadingId === pkg.id ? 'Přesměrovávám…' : 'Koupit'}
              </button>

              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[var(--radius-lg)] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
