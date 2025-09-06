// /app/api/dynmap/[world]/route.ts
import { NextRequest, NextResponse } from 'next/server'

const DYNMAP_BASE = 'http://map.craftmaga.cz:25238'

export async function GET(req: NextRequest, { params }: { params: { world: string } }) {
  try {
    const world = params.world
    const res = await fetch(`${DYNMAP_BASE}/up/world/${world}/`)
    if (!res.ok) return NextResponse.json({ players: [] }, { status: 200 })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Dynmap API fetch error:', err)
    return NextResponse.json({ players: [] })
  }
}
