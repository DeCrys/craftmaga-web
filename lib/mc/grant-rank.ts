import { Rcon } from 'rcon-client'

type GrantArgs = { packageId: string; username: string; pkgName: string }

export async function grantRank({ packageId, username, pkgName }: GrantArgs) {
  const host = process.env.RCON_HOST || '127.0.0.1'
  const port = Number(process.env.RCON_PORT || '25575')
  const password = process.env.RCON_PASSWORD || ''

  if (!password) {
    console.warn('[GRANT-RANK] Missing RCON_PASSWORD, skipping actual grant.')
    console.log(`[GRANT-RANK] Would grant temporary rank for user=${username} (pkg=${pkgName})`)
    return
  }

  // Mapování názvu balíčku na LuckPerms rank (malými písmeny podle serveru)
  const rankMap: Record<string, string> = {
    'VIP Rank': 'vip',
    'LEGEND Rank': 'legend',
    'ULTRA Rank': 'ultra',
    'GOD Rank': 'god',
    'IMMORTAL Rank': 'immortal',
  }

  const rank = rankMap[pkgName]

  if (!rank) {
    console.error(`[GRANT-RANK] Unknown package name: ${pkgName}`)
    return
  }

  console.log(`[GRANT-RANK] Connecting to RCON ${host}:${port}`)

  const rcon = await Rcon.connect({ host, port, password })

  try {
    // LuckPerms: add parent group temporarily na 30 dní
    const duration = '30d'
    const cmd = `lp user ${username} parent addtemp ${rank} ${duration}`
    const res = await rcon.send(cmd)
    console.log(`[GRANT-RANK] Executed: "${cmd}" ->`, res)
  } finally {
    await rcon.end()
  }
}
