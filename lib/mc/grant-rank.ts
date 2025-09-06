import { Rcon } from 'rcon-client'

export async function grantRank(username: string, pkgName: string) {
  console.log(`[GRANT-RANK] ========== STARTING GRANT ==========`)

  const host = process.env.RCON_HOST!
  const port = Number(process.env.RCON_PORT!)
  const password = process.env.RCON_PASSWORD!

  const rankMap: Record<string, string> = {
    'VIP Rank': 'vip',
    'LEGEND Rank': 'legend',
    'ULTRA Rank': 'ultra',
    'GOD Rank': 'god',
    'IMMORTAL Rank': 'immortal',
    'VIP': 'vip',
    'LEGEND': 'legend',
    'ULTRA': 'ultra',
    'GOD': 'god',
    'IMMORTAL': 'immortal',
    'vip': 'vip',
    'legend': 'legend',
    'ultra': 'ultra',
    'god': 'god',
    'immortal': 'immortal'
  }

  const colorMap: Record<string, string> = {
    vip: "green",         // tellraw/title JSON barva
    legend: "gold",
    ultra: "dark_purple",
    god: "red",
    immortal: "blue"
  }

  const legacyMap: Record<string, string> = {
    vip: "§a",        // 🟢 zelená
    legend: "§6",     // 🟡 zlatá
    ultra: "§5",      // 🟣 fialová
    god: "§c",        // 🔴 červená
    immortal: "§9"    // 🔵 modrá
  }

  let rank = rankMap[pkgName] || rankMap[pkgName?.trim()?.toLowerCase()]
  if (!rank) {
    console.error(`[GRANT-RANK] ❌ Unknown package: "${pkgName}"`)
    return
  }

  const color = colorMap[rank] || "white"
  const legacy = legacyMap[rank] || "§f"

  try {
    const rcon = await Rcon.connect({ host, port, password, timeout: 10000 })

    const duration = '30d'
    const cmd = `lp user ${username} parent addtemp ${rank} ${duration}`
    await rcon.send(cmd)

    const notifications = [
      {
        name: "Personal message",
        cmd: `tellraw ${username} {"text":"🎉 Zakoupil jsi rank ${rank.toUpperCase()} na 30 dní 🎉 Děkujeme!","color":"${color}","bold":true}`
      },
      {
        name: "Title screen",
        cmd: `title ${username} title {"text":"🎉 ${rank.toUpperCase()}! 🎉","color":"${color}","bold":true}`
      },
      {
        name: "Broadcast to all",
        cmd: `say §6§l🎉 Hráč §e${username} §6§lsi zakoupil rank ${legacy}§l${rank.toUpperCase()}§6§l! Děkujeme za podporu! 🎉`
      }
    ]

    for (const notification of notifications) {
      try {
        await rcon.send(notification.cmd)
        await new Promise(res => setTimeout(res, 200))
      } catch (msgErr) {
        console.error(`[GRANT-RANK] ⚠️ Failed to send ${notification.name}:`, msgErr)
      }
    }

    await rcon.end()
  } catch (err) {
    console.error('[GRANT-RANK] ❌ RCON ERROR:', err)
    throw err
  }
}
