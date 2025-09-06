import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  try {
    // Info o serveru
    const rInfo = await fetch(`https://minecraftservery.eu/api/v1/server/${token}/info`, {
      headers: { Authorization: token }
    })
    const infoData = await rInfo.json()

    // Hlasy
    const rVotes = await fetch(`https://minecraftservery.eu/api/v1/server/${token}/votes`, {
      headers: { Authorization: token }
    })
    const votesData = await rVotes.json()

    // Poslední hlas
    const lastVoteObj = votesData.votes?.length ? votesData.votes[votesData.votes.length - 1] : null

    return NextResponse.json({
      votes: infoData.votes ?? 0,
      position: infoData.position ?? null,
      lastVoter: lastVoteObj?.nickname ?? null
    })
  } catch (error) {
    console.error("Chyba při komunikaci s MinecraftServery API:", error)
    return NextResponse.json({ error: "Chyba MinecraftServery API" }, { status: 500 })
  }
}