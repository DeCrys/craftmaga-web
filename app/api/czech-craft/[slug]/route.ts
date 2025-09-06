import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    // 1. Získání základních informací o serveru (pro pozici)
    const serverInfoRes = await fetch(`https://czech-craft.eu/api/server/${slug}/`)
    const serverInfoData = await serverInfoRes.json()

    // 2. Získání seznamu hlasů (pro počet hlasů a posledního hlasujícího)
    const votesListRes = await fetch(`https://czech-craft.eu/api/server/${slug}/votes/`)
    const votesListData = await votesListRes.json()

    // Zpracování dat z obou API volání
    const lastVoter = votesListData?.data?.[0]?.username ?? null

    return NextResponse.json({
      votes: votesListData?.vote_count ?? null,
      position: serverInfoData?.position ?? null,
      lastVoter,
    })

  } catch (error) {
    console.error("Chyba při komunikaci s Czech-Craft API:", error)
    return NextResponse.json({ error: "Chyba Czech-Craft API" }, { status: 500 })
  }
}