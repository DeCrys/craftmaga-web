import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")

  try {
    const serverInfoRes = await fetch(`https://api.craftlist.org/v1/${token}/info`)
    const serverInfoData = await serverInfoRes.json()

    const votesListRes = await fetch(`https://api.craftlist.org/v1/${token}/votes/${year}/${month}`)
    const votesListData = await votesListRes.json()

    const lastVoter = Array.isArray(votesListData) && votesListData.length > 0 ? votesListData[0].nickname : null

    const votes = serverInfoData.votes || 0
    const position = serverInfoData.rank || null

    return NextResponse.json({ votes, position, lastVoter })
  } catch (error) {
    console.error("Chyba při komunikaci s Craftlist API:", error)
    return NextResponse.json({ error: "Chyba Craftlist API" }, { status: 500 })
  }
}