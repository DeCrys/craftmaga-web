import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const tokens = {
  "craftlist": process.env.CRAFTLIST_API_TOKEN,
  "minecraftlist": process.env.MINECRAFTSERVERY_API_TOKEN,
  "serverlist": process.env.MINECRAFT_LIST_API_TOKEN,
};

// Czech-Craft (funkční) 
app.get("/api/czech-craft/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    // 1. Získání základních informací o serveru (pro pozici)
    const serverInfoRes = await fetch(`https://czech-craft.eu/api/server/${slug}/`);
    const serverInfoData = await serverInfoRes.json();

    // 2. Získání seznamu hlasů (pro počet hlasů a posledního hlasujícího)
    const votesListRes = await fetch(`https://czech-craft.eu/api/server/${slug}/votes/`);
    const votesListData = await votesListRes.json();

    // Zpracování dat z obou API volání
    const lastVoter = votesListData?.data?.[0]?.username ?? null; // Získáme username prvního prvku v poli `data`

    res.json({
      votes: votesListData?.vote_count ?? null, // Správný název klíče je `vote_count`
      position: serverInfoData?.position ?? null,
      lastVoter,
    });

  } catch (err) {
    console.error("Chyba při komunikaci s Czech-Craft API:", err);
    res.status(500).json({ error: "Chyba Czech-Craft API" });
  }
});

// Craftlist (funkční)
app.get("/api/craftlist/:token", async (req, res) => {
  const token = req.params.token;
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");

  try {
    const serverInfoRes = await fetch(`https://api.craftlist.org/v1/${token}/info`);
    const serverInfoData = await serverInfoRes.json();

    const votesListRes = await fetch(`https://api.craftlist.org/v1/${token}/votes/${year}/${month}`);
    const votesListData = await votesListRes.json();

    const lastVoter = Array.isArray(votesListData) && votesListData.length > 0 ? votesListData[0].nickname : null;

    const votes = serverInfoData.votes || 0;
    const position = serverInfoData.rank || null;

    res.json({ votes, position, lastVoter });
  } catch (err) {
    console.error("Chyba při komunikaci s Craftlist API:", err);
    res.status(500).json({ error: "Chyba Craftlist API" });
  }
});


// MinecraftServery.eu (funkční)
app.get("/api/minecraftlist/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Info o serveru
    const rInfo = await fetch(`https://minecraftservery.eu/api/v1/server/${token}/info`, {
      headers: { Authorization: token }
    });
    const infoData = await rInfo.json();

    // Hlasy
    const rVotes = await fetch(`https://minecraftservery.eu/api/v1/server/${token}/votes`, {
      headers: { Authorization: token }
    });
    const votesData = await rVotes.json();

    // Poslední hlas
    const lastVoteObj = votesData.votes?.length ? votesData.votes[votesData.votes.length - 1] : null;

    // Pozice serveru je přímo v infoData.position
    // votes je celkový počet hlasů z infoData.votes
    res.json({
      votes: infoData.votes ?? 0,
      position: infoData.position ?? null,
      lastVoter: lastVoteObj?.nickname ?? null
    });
  } catch (err) {
    console.error("Chyba při komunikaci s MinecraftServery API:", err);
    res.status(500).json({ error: "Chyba MinecraftServery API" });
  }
});


// Minecraft-list (zatint nefunkční - čeká se na opravu API)
app.get("/api/minecraft-list/:slug", async (req, res) => {
  const { slug } = req.params;
  const apiToken = "V2slAZWGVf017R4SBpqiYcI6Vi2cAwb9";

  try {
    const headers = {
      "Authorization": `Bearer ${apiToken}`,
    };

    // 1. Základní informace o serveru
    const serverInfoRes = await fetch(`https://www.minecraft-list.cz/api/server/${slug}`, { headers });
    const serverInfoData = await serverInfoRes.json();

    // 2. Seznam hlasování (pokud endpoint funguje)
    const votesListRes = await fetch(`https://www.minecraft-list.cz/api/votes/${slug}`, { headers });
    const votesListData = await votesListRes.json();

    // Poslední hlasující (nejnovější hlas)
    const lastVoter = Array.isArray(votesListData.votes) && votesListData.votes.length > 0
      ? votesListData.votes[0].username
      : null;

    const votes = votesListData.votes_count ?? serverInfoData.votes ?? 0;
    const position = serverInfoData.rank ?? null;

    res.json({ votes, position, lastVoter });

  } catch (err) {
    console.error("Chyba při komunikaci s Minecraft-list API:", err);
    res.status(500).json({ error: "Chyba Minecraft-list API" });
  }
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`API server běží na portu ${PORT}`);
});