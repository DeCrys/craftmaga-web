
export async function grantRank(username: string, pkgName: string) {
  console.log(`[GRANT-RANK] Starting grant for user: ${username}, package: ${pkgName}`)
  
  const host = process.env.RCON_HOST!
  const port = Number(process.env.RCON_PORT!)
  const password = process.env.RCON_PASSWORD!

  console.log(`[GRANT-RANK] RCON config: host=${host}, port=${port}`)

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

  console.log(`[GRANT-RANK] Mapped package ${pkgName} to rank ${rank}`)

  try {
    console.log(`[GRANT-RANK] Connecting to RCON server...`)
    const rcon = await Rcon.connect({ host, port, password })
    console.log(`[GRANT-RANK] RCON connected successfully`)

    const duration = '30d'
    const cmd = `lp user ${username} parent addtemp ${rank} ${duration}`
    console.log(`[GRANT-RANK] Executing command: "${cmd}"`)
    
    const res = await rcon.send(cmd)
    console.log(`[GRANT-RANK] Command executed successfully. Response:`, res)
    
    await rcon.end()
    console.log(`[GRANT-RANK] RCON connection closed`)
  } catch (err) {
    console.error('[GRANT-RANK] RCON ERROR:', err)
    throw err // Re-throw aby se error dostal do webhook logu
  }
}
