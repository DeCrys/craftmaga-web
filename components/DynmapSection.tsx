'use client'

import { useState, useEffect } from 'react'
import { Map, Users, Maximize2 } from "lucide-react"

// Typy
interface PlayerData {
  player: string
  location: string
  coords: string
  x: number
  y: number
  z: number
}

interface PlayerApiResponse {
  name?: string
  account?: string
  world?: string
  x?: number
  y?: number
  z?: number
}

interface DynmapApiResponse {
  players: PlayerApiResponse[]
}

// Dynmap sekce
const DynmapSection = () => {
  const [currentWorld, setCurrentWorld] = useState("spawn")
  const [onlinePlayers, setOnlinePlayers] = useState<PlayerData[]>([])
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 64, z: 0 })

  const dynmapDirectUrl = "http://map.craftmaga.cz:25238"
  const dynmapProxyUrl = "/api/dynmap"

  const fetchOnlinePlayers = async (world: string) => {
    try {
      // Používáme API route správně
      const url = `${dynmapProxyUrl}/${world}`
      console.log("Fetching Dynmap API:", url)

      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const contentType = res.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        console.warn("Response is not JSON")
        setOnlinePlayers([])
        return
      }

      const data: DynmapApiResponse = await res.json()
      if (!Array.isArray(data.players)) {
        setOnlinePlayers([])
        return
      }

      const players: PlayerData[] = data.players.map(p => ({
        player: p.name || p.account || "Neznámý hráč",
        location: p.world || world,
        coords: `${Math.round(p.x || 0)}, ${Math.round(p.y || 64)}, ${Math.round(p.z || 0)}`,
        x: Math.round(p.x || 0),
        y: Math.round(p.y || 64),
        z: Math.round(p.z || 0)
      }))

      setOnlinePlayers(players)
    } catch (e) {
      console.error("Dynmap fetch error:", e)
      setOnlinePlayers([])
    }
  }

  useEffect(() => {
    fetchOnlinePlayers(currentWorld)
    const interval = setInterval(() => fetchOnlinePlayers(currentWorld), 5000)
    return () => clearInterval(interval)
  }, [currentWorld])

  const handlePlayerClick = (player: PlayerData) => {
    setMapCenter({ x: player.x, y: player.y, z: player.z })
    if (player.location !== currentWorld) setCurrentWorld(player.location)
  }

  const openFullscreenMap = () => window.open(dynmapDirectUrl, "_blank")

  return (
    <section id="dynmap" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full">
            <Map className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Dynmap</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Živá Mapa Světa</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Prozkoumej celý serverový svět v reálném čase. Sleduj hráče, najdi lokace a plánuj své dobrodružství!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map Preview */}
          <div className="lg:col-span-2">
            <div className="card-glass relative overflow-hidden group">
              <div className="relative h-96 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg overflow-hidden">
                <iframe
                  src="http://map.craftmaga.cz:25238"
                  className="w-full h-full border-0 rounded-lg"
                  title="Dynmap"
                />
                <button
                  onClick={openFullscreenMap}
                  className="absolute top-4 right-4 glass p-2 rounded-lg hover:bg-glass-hover transition-colors group/btn z-10"
                >
                  <Maximize2 className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentWorld("spawn")}
                    className={`glass px-3 py-1 rounded-md text-sm hover:bg-glass-hover transition-colors ${currentWorld === "spawn" ? "bg-primary/20 text-white" : ""}`}
                  >
                    Spawn
                  </button>
                  <button
                    onClick={() => setCurrentWorld("playworld")}
                    className={`glass px-3 py-1 rounded-md text-sm hover:bg-glass-hover transition-colors ${currentWorld === "playworld" ? "bg-primary/20 text-white" : ""}`}
                  >
                    Playworld
                  </button>
                </div>
                <button
                  onClick={openFullscreenMap}
                  className="btn-hero py-2 px-4 text-sm justify-center items-center h-9 hidden sm:inline-flex"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Otevřít plnou mapu
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:self-center">
            <div className="card-glass max-h-96">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Online hráči</h3>
                <div className="ml-auto glass px-2 py-1 rounded text-xs">
                  {onlinePlayers.length}
                </div>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
                {onlinePlayers.length > 0 ? (
                  onlinePlayers.map((p, i) => (
                    <div
                      key={p.player}
                      onClick={() => handlePlayerClick(p)}
                      className="flex items-center gap-3 p-2 glass rounded-lg hover:bg-glass-hover transition-colors cursor-pointer group"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animation: 'fade-in-scale 0.4s ease-out both'
                      }}
                    >
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                          {p.player}
                        </div>
                        <div className="text-xs text-foreground/60 truncate">
                          {p.location} – {p.coords}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-foreground/70 text-sm py-4">Žádní hráči online.</p>
                )}
              </div>
            </div>
          </div>
          {/* /Sidebar */}
        </div>
      </div>
    </section>
  )
}

export default DynmapSection
