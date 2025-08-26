import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cesta k dist složce
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servírování buildu z Vite (dist/)
app.use(express.static(path.join(__dirname, "dist")));

// --- API endpoint příklad ---
app.post("/api/login", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Chybí uživatelské jméno" });
  }
  // tady by byla logika na ověření
  res.json({ success: true, user: username });
});

// Pokud není žádný API route -> vrať index.html (kvůli React Routeru)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ CORS opraven (https + bez lomítka na konci)
app.use(
  cors({
    origin: "https://crafmaga-web-production.up.railway.app",
  })
);

// Minecraft server info
const MINECRAFT_SERVER_IP = "play.craftmaga.cz";
const MINECRAFT_SERVER_PORT = 25048;

// Získání UUID z Mojang API
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

// Kontrola online statusu hráče
async function isPlayerOnline(nick) {
  try {
    const response = await status(MINECRAFT_SERVER_IP, MINECRAFT_SERVER_PORT);

    // Použij sample (novější verze vrací sample místo list)
    const playerList = response.players.sample || [];
    const isOnline = playerList.some(
      (player) => player.name.toLowerCase() === nick.toLowerCase()
    );

    return {
      isOnline,
      onlinePlayers: response.players.online,
      maxPlayers: response.players.max,
    };
  } catch (error) {
    console.error("Chyba při komunikaci s Minecraft serverem:", error);
    return { isOnline: false, onlinePlayers: 0, maxPlayers: 0 };
  }
}

// Endpoint login
app.post("/api/login", async (req, res) => {
  const { nick } = req.body;
  if (!nick) return res.status(400).json({ error: "Musíš zadat nick" });

  try {
    const uuid = await getUUID(nick);
    if (!uuid) {
      return res.status(404).json({ error: "Hráč nenalezen" });
    }

    const onlineStatus = await isPlayerOnline(nick);

    res.json({
      online: onlineStatus.isOnline,
      onlinePlayers: onlineStatus.onlinePlayers,
      skinUrl: `https://crafatar.com/avatars/${uuid}?size=64&overlay`,
      uuid,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chyba při získávání dat o hráči" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
