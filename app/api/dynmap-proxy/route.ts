
// /app/api/dynmap-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server'

const DYNMAP_URL = 'http://map.craftmaga.cz:25238'

export async function GET(req: NextRequest) {
  try {
    // Získáme URL path a query z původního requestu
    const path = req.nextUrl.pathname.replace('/api/dynmap-proxy', '')
    const search = req.nextUrl.search

    const url = `${DYNMAP_URL}${path}${search}`
    console.log('Proxying Dynmap iframe request:', url)

    const res = await fetch(url)
    const body = await res.arrayBuffer() // aby fungovalo i s HTML, JS, obrázky, mapy...
    const headers = new Headers(res.headers)
    headers.set('Access-Control-Allow-Origin', '*') // aby šlo iframe načíst
    return new Response(body, { status: res.status, headers })
  } catch (err) {
    console.error('Dynmap iframe proxy error:', err)
    return new Response('Error proxying Dynmap', { status: 500 })
  }
}

