import { Rcon } from 'rcon-client'

export async function grantRank(username: string, pkgName: string) {
  console.log(`[GRANT-RANK] ========== STARTING GRANT ==========`)
  console.log(`[GRANT-RANK] Timestamp: ${new Date().toISOString()}`)
  console.log(`[GRANT-RANK] Input user: "${username}" (type: ${typeof username}, length: ${username?.length || 'N/A'})`)
  console.log(`[GRANT-RANK] Input package: "${pkgName}" (type: ${typeof pkgName}, length: ${pkgName?.length || 'N/A'})`)
  
  // Check for hidden characters in inputs
  console.log(`[GRANT-RANK] Username hex: ${Buffer.from(username || '').toString('hex')}`)
  console.log(`[GRANT-RANK] Package hex: ${Buffer.from(pkgName || '').toString('hex')}`)
  
  const host = process.env.RCON_HOST!
  const port = Number(process.env.RCON_PORT!)
  const password = process.env.RCON_PASSWORD!
  
  console.log(`[GRANT-RANK] ========== ENVIRONMENT ==========`)
  console.log(`[GRANT-RANK] RCON_HOST: ${host || 'MISSING'}`)
  console.log(`[GRANT-RANK] RCON_PORT: ${port || 'MISSING'}`)
  console.log(`[GRANT-RANK] RCON_PASSWORD: ${password ? 'SET (length: ' + password.length + ')' : 'MISSING'}`)
  
  // Enhanced rank mapping with multiple variations
  const rankMap: Record<string, string> = {
    // Original names
    'VIP Rank': 'vip',
    'LEGEND Rank': 'legend',
    'ULTRA Rank': 'ultra',
    'GOD Rank': 'god',
    'IMMORTAL Rank': 'immortal',
    
    // Without "Rank" suffix
    'VIP': 'vip',
    'LEGEND': 'legend',
    'ULTRA': 'ultra',
    'GOD': 'god',
    'IMMORTAL': 'immortal',
    
    // Lowercase versions
    'vip rank': 'vip',
    'legend rank': 'legend',
    'ultra rank': 'ultra',
    'god rank': 'god',
    'immortal rank': 'immortal',
    
    'vip': 'vip',
    'legend': 'legend',
    'ultra': 'ultra',
    'god': 'god',
    'immortal': 'immortal',
    
    // Mixed case versions
    'Vip Rank': 'vip',
    'Legend Rank': 'legend',
    'Ultra Rank': 'ultra',
    'God Rank': 'god',
    'Immortal Rank': 'immortal',
    
    'Vip': 'vip',
    'Legend': 'legend',
    'Ultra': 'ultra',
    'God': 'god',
    'Immortal': 'immortal'
  }
  
  console.log(`[GRANT-RANK] ========== PACKAGE MAPPING ==========`)
  console.log(`[GRANT-RANK] Available packages:`, Object.keys(rankMap))
  
  // Try exact match first
  let rank = rankMap[pkgName]
  console.log(`[GRANT-RANK] Exact match for "${pkgName}": ${rank || 'NOT FOUND'}`)
  
  // If no exact match, try trimmed version
  if (!rank && pkgName) {
    const trimmedPkg = pkgName.trim()
    rank = rankMap[trimmedPkg]
    console.log(`[GRANT-RANK] Trimmed match for "${trimmedPkg}": ${rank || 'NOT FOUND'}`)
  }
  
  // If still no match, try case-insensitive
  if (!rank && pkgName) {
    const lowerPkg = pkgName.toLowerCase().trim()
    rank = rankMap[lowerPkg]
    console.log(`[GRANT-RANK] Lowercase match for "${lowerPkg}": ${rank || 'NOT FOUND'}`)
  }
  
  if (!rank) {
    console.error(`[GRANT-RANK] ❌ Unknown package: "${pkgName}"`)
    console.error(`[GRANT-RANK] Package not found in any variation`)
    console.error(`[GRANT-RANK] Available packages:`, Object.keys(rankMap))
    console.error(`[GRANT-RANK] ========== FAILED - UNKNOWN PACKAGE ==========`)
    return
  }
  
  console.log(`[GRANT-RANK] ✅ Successfully mapped "${pkgName}" -> "${rank}"`)
  
  try {
    console.log(`[GRANT-RANK] ========== RCON CONNECTION ==========`)
    console.log(`[GRANT-RANK] Connecting to ${host}:${port}...`)
    
    const startTime = Date.now()
    const rcon = await Rcon.connect({ 
      host, 
      port, 
      password,
      timeout: 10000
    })
    
    const connectTime = Date.now() - startTime
    console.log(`[GRANT-RANK] ✅ RCON connected successfully in ${connectTime}ms`)
    
    const duration = '30d'
    const cmd = `lp user ${username} parent addtemp ${rank} ${duration}`
    
    console.log(`[GRANT-RANK] ========== COMMAND EXECUTION ==========`)
    console.log(`[GRANT-RANK] Executing command: "${cmd}"`)
    
    const cmdStartTime = Date.now()
    const res = await rcon.send(cmd)
    const cmdTime = Date.now() - cmdStartTime
    
    console.log(`[GRANT-RANK] ✅ Command executed successfully in ${cmdTime}ms`)
    console.log(`[GRANT-RANK] Server response: "${res}"`)
    
    // Send multiple notifications
    const notifications = [
      {
        name: "Personal message",
        cmd: `tellraw ${username} {"text":"🎉 Parádá zakoupil jsi rank ${rank.toUpperCase()}! po dobu 30 dní 🎉 Děkujeme za podporu","color":"dark_purple","bold":true}`
      },
      { 
        name: "Title screen",
        cmd: `title ${username} title {"text":"🎉 Zakoupil rank ${rank.toUpperCase()}! 🎉","color":"dark_purple","bold":true}`
      },
      {
        name: "Broadcast to all",
        cmd: `say §6§l🎉 Hráč §e${username} §6§lsi zakoupil rank §a§l${rank.toUpperCase()}§6§l! Děkujeme za podporu! §6§l🎉`
      }
    ]
    
    console.log(`[GRANT-RANK] ========== SENDING NOTIFICATIONS ==========`)
    
    for (const notification of notifications) {
      try {
        console.log(`[GRANT-RANK] Sending ${notification.name}...`)
        const notifRes = await rcon.send(notification.cmd)
        console.log(`[GRANT-RANK] ✅ ${notification.name} sent: "${notifRes}"`)
        
        // Small delay between notifications
        await new Promise(resolve => setTimeout(resolve, 200))
        
      } catch (msgErr) {
        console.error(`[GRANT-RANK] ⚠️  Failed to send ${notification.name}:`, msgErr)
        // Continue with other notifications - don't stop the process
      }
    }
    
    await rcon.end()
    console.log(`[GRANT-RANK] 🔐 RCON connection closed`)
    console.log(`[GRANT-RANK] ========== SUCCESS ==========`)
    
  } catch (err) {
    console.error('[GRANT-RANK] ❌ RCON ERROR:', err)
    
    if (err instanceof Error) {
      console.error('[GRANT-RANK] Error details:')
      console.error('[GRANT-RANK] - Name:', err.name)
      console.error('[GRANT-RANK] - Message:', err.message)
      console.error('[GRANT-RANK] - Stack:', err.stack)
    }
    
    console.error(`[GRANT-RANK] ========== FAILED - RCON ERROR ==========`)
    throw err
  }
}
