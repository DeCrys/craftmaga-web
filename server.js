import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

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

// Craftlist
app.get("/api/craftlist/:slug", async (req, res) => {
  const { slug } = req.params;
  const token = "hdlnzauscxe4xidt7sph"; // tvůj API token

  try {
    // 1. Získání informací o serveru (info)
    const serverInfoRes = await fetch(`https://api.craftlist.org/v1/${token}/info`);
    const serverInfoData = await serverInfoRes.json();
    
    // 2. Získání seznamu hlasů (votes)
    const votesListRes = await fetch(`https://api.craftlist.org/v1/${token}/votes/`);
    const votesListData = await votesListRes.json();
    
    // Zpracování dat
    const votes = serverInfoData?.votes ?? null;
    const position = serverInfoData?.rank ?? null;
    const lastVoter = votesListData?.data?.[0]?.username ?? null;

    res.json({
      votes,
      position,
      lastVoter,
    });
  } catch (err) {
    console.error("Chyba při komunikaci s Craftlist API:", err);
    res.status(500).json({ error: "Chyba Craftlist API" });
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