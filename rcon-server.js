import { Rcon } from 'rcon-client';

// Nastavení podle tvého serveru
const RCON_HOST = 'play.craftmaga.cz'; // nebo veřejná IP
const RCON_PORT = 25575;
const RCON_PASSWORD = '15041986';

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
}

