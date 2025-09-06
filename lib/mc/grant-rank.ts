import { Rcon } from 'rcon-client'

type GrantArgs = { packageId: string; username: string; pkgName: string }

export async function isPlayerOnline(playerName: string): Promise<boolean> {
  let rcon: Rcon | null = null;

  try {
    rcon = await Rcon.connect({
      host: RCON_HOST,
      port: RCON_PORT,
      password: RCON_PASSWORD,
    });

    // Minecraft příkaz pro ověření hráče
    const response = await rcon.send(`list`);
    // response vypadá např.: "There are 1/20 players online: CD250"
    const onlinePlayers = response.split(':')[1]?.split(',').map(p => p.trim()) || [];
    return onlinePlayers.includes(playerName);
  } catch (err) {
    console.error('Chyba RCON:', err);
    return false;
  } finally {
    if (rcon) await rcon.end();
  }


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
