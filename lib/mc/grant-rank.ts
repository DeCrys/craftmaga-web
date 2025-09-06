import { Rcon } from 'rcon-client'

export async function grantRank(username: string, pkgName: string) {
  const host = process.env.RCON_HOST!
  const port = Number(process.env.RCON_PORT!)
  const password = process.env.RCON_PASSWORD!

  const rankMap: Record<string, string> = {
    'VIP Rank': 'vip',
    'LEGEND Rank': 'legend',
    'ULTRA Rank': 'ultra',
    'GOD Rank': 'god',
    'IMMORTAL Rank': 'immortal',
  }

  const rank = rankMap[pkgName]
  if (!rank) {
    console.error(`[GRANT-RANK] Unknown package: ${pkgName}`)
    return
  }

  const rcon = await Rcon.connect({ host, port, password })

  try {
    const duration = '30d'
    const cmd = `lp user ${username} parent addtemp ${rank} ${duration}`
    const res = await rcon.send(cmd)
    console.log(`[GRANT-RANK] Executed: "${cmd}" ->`, res)
  } catch (err) {
    console.error('[RCON ERROR]', err)
  } finally {
    await rcon.end()
  }
}
