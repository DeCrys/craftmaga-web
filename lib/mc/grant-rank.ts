import { Rcon } from 'rcon-client'

export async function grantRank(username: string, pkgName: string) {
  console.log(`[GRANT-RANK] ========== STARTING ==========`)
  console.log(`[GRANT-RANK] User: ${username}`)
  console.log(`[GRANT-RANK] Package: ${pkgName}`)
  console.log(`[GRANT-RANK] Timestamp: ${new Date().toISOString()}`)
  
  const host = process.env.RCON_HOST!
  const port = Number(process.env.RCON_PORT!)
  const password = process.env.RCON_PASSWORD!
  
  console.log(`[GRANT-RANK] Environment variables:`)
  console.log(`[GRANT-RANK] - RCON_HOST: ${host || 'MISSING'}`)
  console.log(`[GRANT-RANK] - RCON_PORT: ${port || 'MISSING'}`)
  console.log(`[GRANT-RANK] - RCON_PASSWORD: ${password ? 'SET (length: ' + password.length + ')' : 'MISSING'}`)
  
  const rankMap: Record<string, string> = {
    'VIP Rank': 'vip',
    'LEGEND Rank': 'legend',
    'ULTRA Rank': 'ultra',
    'GOD Rank': 'god',
    'IMMORTAL Rank': 'immortal',
  }
  
  const rank = rankMap[pkgName]
  console.log(`[GRANT-RANK] Package mapping: "${pkgName}" -> "${rank || 'NOT FOUND'}"`)
  
  if (!rank) {
    console.error(`[GRANT-RANK] ❌ Unknown package: ${pkgName}`)
    console.error(`[GRANT-RANK] Available packages:`, Object.keys(rankMap))
    return
  }
  
  try {
    console.log(`[GRANT-RANK] 🔌 Connecting to RCON server ${host}:${port}...`)
    const startTime = Date.now()
    
    const rcon = await Rcon.connect({ 
      host, 
      port, 
      password,
      timeout: 10000 // 10 second timeout
    })
    
    const connectTime = Date.now() - startTime
    console.log(`[GRANT-RANK] ✅ RCON connected successfully in ${connectTime}ms`)
    
    const duration = '30d'
    const cmd = `lp user ${username} parent addtemp ${rank} ${duration}`
    console.log(`[GRANT-RANK] 📝 Executing command: "${cmd}"`)
    
    const cmdStartTime = Date.now()
    const res = await rcon.send(cmd)
    const cmdTime = Date.now() - cmdStartTime
    
    console.log(`[GRANT-RANK] ✅ Command executed in ${cmdTime}ms`)
    console.log(`[GRANT-RANK] 📤 Server response:`, res)
    
    await rcon.end()
    console.log(`[GRANT-RANK] 🔐 RCON connection closed`)
    console.log(`[GRANT-RANK] ========== SUCCESS ==========`)
    
  } catch (err) {
    console.error('[GRANT-RANK] ❌ RCON ERROR:', err)
    
    if (err instanceof Error) {
      console.error('[GRANT-RANK] Error name:', err.name)
      console.error('[GRANT-RANK] Error message:', err.message)
      console.error('[GRANT-RANK] Error stack:', err.stack)
    }
    
    console.log(`[GRANT-RANK] ========== FAILED ==========`)
    throw err // Re-throw aby se error dostal do webhook logu
  }
}
