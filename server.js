import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Načti tokeny z env proměnných
const tokens = {
  "czech-craft": process.env.CZECH_CRAFT_API_TOKEN,
  "craftlist": process.env.CRAFTLIST_API_TOKEN,
  "minecraftlist": process.env.MINECRAFTSERVERY_API_TOKEN,
  "serverlist": process.env.MINECRAFT_LIST_API_TOKEN,
};

// Czech-Craft (funkční) 
app.get("/api/czech-craft/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const serverInfoRes = await fetch(`https://czech-craft.eu/api/server/${slug}/`);
    const serverInfoData = await serverInfoRes.json();

    const votesListRes = await fetch(`https://czech-craft.eu/api/server/${slug}/votes/`);
    const votesListData = await votesListRes.json();

    const lastVoter = votesListData?.data?.[0]?.username ?? null;

    res.json({
      votes: votesListData?.vote_count ?? null,
      position: serverInfoData?.position ?? null,
      lastVoter,
    });

  } catch (err) {
    console.error("Chyba při komunikaci s Czech-Craft API:", err);
    res.status(500).json({ error: "Chyba Czech-Craft API" });
  }
});

// Craftlist (funkční)
app.get("/api/craftlist/:slug", async (req, res) => {
  const slug = req.params.slug;
  const token = tokens["craftlist"];
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
app.get("/api/minecraftlist/:slug", async (req, res) => {
  const slug = req.params.slug;
  const token = tokens["minecraftlist"];

  try {
    const rInfo = await fetch(`https://minecraftservery.eu/api/v1/server/${token}/info`, {
      headers: { Authorization: token }
    });
    const infoData = await rInfo.json();

    const rVotes = await fetch(`https://minecraftservery.eu/api/v1/server/${token}/votes`, {
      headers: { Authorization: token }
    });
    const votesData = await rVotes.json();

    const lastVoteObj = votesData.votes?.length ? votesData.votes[votesData.votes.length - 1] : null;

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

// Minecraft-list
app.get("/api/minecraft-list/:slug", async (req, res) => {
  const { slug } = req.params;
  const apiToken = tokens["serverlist"];

  try {
    const headers = {
      "Authorization": `Bearer ${apiToken}`,
    };

    // Základní data serveru
    const serverInfoRes = await fetch(`https://www.minecraft-list.cz/api/server/${slug}`, { headers });
    const serverInfoData = await serverInfoRes.json();

    // Hlasy
    const votesListRes = await fetch(`https://www.minecraft-list.cz/api/votes/${slug}`, { headers });
    const votesListData = await votesListRes.json();

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

app.listen(PORT, () => {
  console.log(`API server běží na portu ${PORT}`);
});
