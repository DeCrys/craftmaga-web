import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Czech-Craft (bez klíče)
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

// Craftlist (bez klíče)
app.get("/api/craftlist/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    // 1. Získání základních informací o serveru (pro pozici)
    const serverInfoRes = await fetch(`https://craftlist.org/api/server/${slug}/`);
    const serverInfoData = await serverInfoRes.json();

    // 2. Získání seznamu hlasů (pro počet hlasů a posledního hlasujícího)
    const votesListRes = await fetch(`https://craftlist.org/api/server/${slug}/votes/`);
    const votesListData = await votesListRes.json();

    // Zpracování dat z obou API volání
    const lastVoter = votesListData?.data?.[0]?.username ?? null; // Získáme username prvního prvku v poli `data`

    res.json({
      votes: votesListData?.vote_count ?? null, // Správný název klíče je `vote_count`
      position: serverInfoData?.position ?? null,
      lastVoter,
    });

  } catch (err) {
    console.error("Chyba při komunikaci s Craftlist API:", err);
    res.status(500).json({ error: "Craftlist API" });
  }
});

// MinecraftServery.eu
app.get("/api/minecraftlist/:token", async (req, res) => {
  try {
    // Info serveru
    const rInfo = await fetch(`https://minecraftservery.eu/api/v1/server/${req.params.token}/info`, {
      headers: { Authorization: req.params.token }
    });
    const infoData = await rInfo.json();

    // Hlasy
    const rVotes = await fetch(`https://minecraftservery.eu/api/v1/server/${req.params.token}/votes`, {
      headers: { Authorization: req.params.token }
    });
    const votesData = await rVotes.json();
    // Vrací pole, nejnovější je na konci, je potřeba vzít poslední
    const lastVoteObj = votesData.votes?.length ? votesData.votes[votesData.votes.length - 1] : null;

    res.json({
      votes: infoData.position?.votes ?? null,
      position: infoData.position?.rating ?? null,
      lastVoter: lastVoteObj?.nickname ?? null
    });
  } catch (err) {
    res.status(500).json({ error: "Chyba MinecraftServery API" });
  }
});

// Minebook (bez klíče)
app.get("/api/minebook/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Získání základních informací o serveru (pro pozici)
    const serverInfoRes = await fetch(`https://minebook.eu/api/server/${id}/`);
    const serverInfoData = await serverInfoRes.json();

    // 2. Získání seznamu hlasů (pro počet hlasů a posledního hlasujícího)
    const votesListRes = await fetch(`https://minebook.eu/api/server/${id}/votes/`);
    const votesListData = await votesListRes.json();
    // Zpracování dat z obou API volání
    const lastVoter = votesListData?.data?.[0]?.username ?? null; // Získáme username prvního prvku v poli `data`
    res.json({
      votes: votesListData?.vote_count ?? null, // Správný název klíče je `vote_count`
      position: serverInfoData?.position ?? null,
      lastVoter,
    });
  } catch (err) {
    console.error("Chyba při komunikaci s Minebook API:", err);
    res.status(500).json({ error: "Chyba Minebook API" });
  }
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`API server běží na portu ${PORT}`);
});