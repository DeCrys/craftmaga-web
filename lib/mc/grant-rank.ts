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

    const response = await rcon.send(`list`);
    // response např.: "There are 1/20 players online: CD250"
    const onlinePlayers = response.split(':')[1]?.split(',').map(p => p.trim()) || [];
    return onlinePlayers.includes(playerName);
  } catch (err) {
    console.error('Chyba RCON:', err);
    return false;
  } finally {
    if (rcon) await rcon.end();
  }
}

// funkce na grant ranku
export async function grantRank({ username, pkgName }: GrantArgs): Promise<void> {
  if (!RCON_PASSWORD) {
    console.warn('[GRANT-RANK] Missing RCON_PASSWORD, skipping actual grant.')
    console.log(`[GRANT-RANK] Would grant temporary rank for user=${username} (pkg=${pkgName})`)
    return
  }

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

  console.log(`[GRANT-RANK] Connecting to RCON ${RCON_HOST}:${RCON_PORT}`)

  const rcon = await Rcon.connect({
    host: RCON_HOST,
    port: RCON_PORT,
    password: RCON_PASSWORD,
  })

  try {
    const duration = '30d'
    const cmd = `lp user ${username} parent addtemp ${rank} ${duration}`
    const res = await rcon.send(cmd)
    console.log(`[GRANT-RANK] Executed: "${cmd}" ->`, res)
  } finally {
    await rcon.end()
  }
}
