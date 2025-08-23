// VIPShop.tsx
import React, { useState } from 'react'

type VIPPack = {
  id: number
  name: string
  price: number
  label: string
}

type VIPShopProps = {
  playerName: string
}

const vipPacks: VIPPack[] = [
  { id: 101, name: 'Knight Rank', price: 2000, label: 'Kupte Knight VIP' },
  { id: 102, name: 'Lord Rank', price: 4000, label: 'Kupte Lord VIP' },
  { id: 103, name: 'Paladin Rank', price: 6000, label: 'Kupte Paladin VIP' },
  { id: 104, name: 'Duke Rank', price: 8000, label: 'Kupte Duke VIP' },
  { id: 105, name: 'King Rank', price: 10000, label: 'Kupte King VIP' },
]

const VIPShop: React.FC<VIPShopProps> = ({ playerName }) => {
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const handleBuy = async (pack: VIPPack) => {
    setLoadingId(pack.id)
    try {
      const res = await fetch('/api/tebexCheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: pack.id, playerName })
      })
      const data = await res.json()
      if (data?.checkout_url) {
        window.open(data.checkout_url, '_blank', 'width=500,height=700')
      } else {
        alert('Chyba při vytvoření platební session.')
      }
    } catch (err) {
      console.error(err)
      alert('Chyba při komunikaci s Tebex API.')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vipPacks.map(pack => (
        <div key={pack.id} className="card-glass p-6 text-center relative">
          <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
          <p className="text-sm text-foreground/70 mb-4">Cena: {pack.price} Coins</p>
          <button
            onClick={() => handleBuy(pack)}
            disabled={loadingId === pack.id}
            className="btn-hero bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 w-full"
          >
            {loadingId === pack.id ? 'Načítám...' : pack.label}
          </button>
        </div>
      ))}
    </div>
  )
}

export default VIPShop
