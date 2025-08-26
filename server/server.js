import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch"; // pokud ještě nemáš, nainstaluj: npm i node-fetch
import { status } from "minecraft-server-util"; // pokud ještě nemáš: npm i minecraft-server-util

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cesta k dist složce Vite
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

// --- API endpoint login ---
app.post("/api/login", async (req, res) => {
  const { nick } = req.body;
  if (!nick) return res.status(400).json({ error: "Musíš zadat nick" });

  try {
    // Získání UUID z Mojang API
    const uuidRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nick}`);
    if (!uuidRes.ok) return res.status(404).json({ error: "Hráč nenalezen" });
    const uuidData = await uuidRes.json();
    const uuid = uuidData.id;

    // Kontrola online statusu Minecraft serveru
    const MINECRAFT_SERVER_IP = "play.craftmaga.cz";
    const MINECRAFT_SERVER_PORT = 25048;
    const response = await status(MINECRAFT_SERVER_IP, MINECRAFT_SERVER_PORT);
    const playerList = response.players.sample || [];
    const isOnline = playerList.some(
      (player) => player.name.toLowerCase() === nick.toLowerCase()
    );

    res.json({
      online: isOnline,
      onlinePlayers: response.players.online,
      maxPlayers: response.players.max,
      skinUrl: `https://crafatar.com/avatars/${uuid}?size=64&overlay`,
      uuid,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chyba při získávání dat o hráči" });
  }
});

// Pokud žádný API route, vrať index.html (pro React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// PORT z Railway env
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
