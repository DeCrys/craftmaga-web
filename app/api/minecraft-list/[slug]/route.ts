import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const apiToken = "V2slAZWGVf017R4SBpqiYcI6Vi2cAwb9"

  try {
    const headers = {
      "Authorization": `Bearer ${apiToken}`,
    }

    // 1. Základní informace o serveru
    const serverInfoRes = await fetch(`https://www.minecraft-list.cz/api/server/${slug}`, { headers })
    const serverInfoData = await serverInfoRes.json()

    // 2. Seznam hlasování (pokud endpoint funguje)
    const votesListRes = await fetch(`https://www.minecraft-list.cz/api/votes/${slug}`, { headers })
    const votesListData = await votesListRes.json()

    // Poslední hlasující (nejnovější hlas)
    const lastVoter = Array.isArray(votesListData.votes) && votesListData.votes.length > 0
      ? votesListData.votes[0].username
      : null

    const votes = votesListData.votes_count ?? serverInfoData.votes ?? 0
    const position = serverInfoData.rank ?? null

    return NextResponse.json({ votes, position, lastVoter })

  } catch (error) {
    console.error("Chyba při komunikaci s Minecraft-list API:", error)
    return NextResponse.json({ error: "Chyba Minecraft-list API" }, { status: 500 })
  }
}