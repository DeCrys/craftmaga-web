import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { status } from 'minecraft-server-util'; // ✨ Importujeme novou knihovnu

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// ✨ Tady zadej IP adresu a port tvého Minecraft serveru
const MINECRAFT_SERVER_IP = 'play.craftmaga.cz';
const MINECRAFT_SERVER_PORT = 25048; // Standardní port pro Minecraft

// Funkce pro získání UUID hráče
async function getUUID(nick) {
    try {
        const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nick}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.id;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// ✨ Nová funkce, která kontroluje online status hráče
async function isPlayerOnline(nick) {
    try {
        // Požádáme Minecraft server o jeho status a seznam hráčů
        const response = await status(MINECRAFT_SERVER_IP, MINECRAFT_SERVER_PORT);
        
        // Zkontrolujeme, jestli je hráč online
        const onlinePlayers = response.players.online;
        const maxPlayers = response.players.max;
        const isOnline = response.players.list?.some(player => player.name.toLowerCase() === nick.toLowerCase());
        
        return { isOnline, onlinePlayers, maxPlayers };

    } catch (error) {
        console.error('Chyba při komunikaci s Minecraft serverem:', error);
        return { isOnline: false, onlinePlayers: 0, maxPlayers: 0 };
    }
}

// Endpoint pro přihlášení
app.post('/api/login', async (req, res) => {
    const { nick } = req.body;
    if (!nick) return res.status(400).json({ error: 'Musíš zadat nick' });

    try {
        const uuid = await getUUID(nick);
        if (!uuid) {
            return res.status(404).json({ error: 'Hráč nenalezen' });
        }

        const onlineStatus = await isPlayerOnline(nick); // ✨ Voláme novou funkci
        
        res.json({ online: onlineStatus.isOnline, onlinePlayers: onlineStatus.onlinePlayers, skinUrl: `https://crafatar.com/avatars/${uuid}?size=64&overlay`, uuid });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Chyba při získávání dat o hráči' });
    }
});

app.listen(3001, () => console.log('Server běží na http://localhost:3001'));