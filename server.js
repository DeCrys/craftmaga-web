import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Rcon } from "rcon-client";

// Konfigurace RCON
const RCON_HOST = "54.36.113.186"; // IP serveru
const RCON_PORT = 25575;       // Port z server.properties
const RCON_PASSWORD = "15041986";

// Jednoduchá in-memory session
const sessions = new Map(); // { sessionToken: { nick, online } }

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Funkce pro ověření online hráče přes RCON
async function isPlayerOnline(nick) {
  let rcon;
  try {
    rcon = await Rcon.connect({ host: RCON_HOST, port: RCON_PORT, password: RCON_PASSWORD });
    const response = await rcon.send("list"); // Vrátí seznam online hráčů
    // response: "There are X of a max of Y players online: nick1, nick2, ..."
    const onlinePlayers = response.split(":")[1]?.split(",").map(p => p.trim()) || [];
    await rcon.end();
    return onlinePlayers.includes(nick);
  } catch (err) {
    console.error("RCON error:", err);
    if (rcon) await rcon.end();
    return false;
  }
}

// POST /api/login
app.post("/api/login", async (req, res) => {
  const { nick } = req.body;
  if (!nick) return res.status(400).json({ error: "Nick je povinný" });

  const online = await isPlayerOnline(nick);

  // Generování jednoduchého session tokenu
  const sessionToken = Math.random().toString(36).substring(2, 12);
  sessions.set(sessionToken, { nick, online });

  res.json({ nick, online, sessionToken });
});

// GET /api/session/:token (pro kontrolu session)
app.get("/api/session/:token", (req, res) => {
  const session = sessions.get(req.params.token);
  if (!session) return res.status(404).json({ error: "Session nenalezena" });
  res.json(session);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
