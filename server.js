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
    const r = await fetch(`https://czech-craft.eu/api/server/${slug}`);
    const data = await r.json();

    const lastVote = data?.data?.[0]; // poslední hlasující
    const lastVoter = lastVote?.username ?? null;

    res.json({
      votes: data?.votes_count ?? null,
      position: data?.position ?? null,
      lastVoter,
    });
  } catch (err) {
    res.status(500).json({ error: "Chyba Czech-Craft API" });
  }
});

// Craftlist (s API tokenem)
app.get("/api/craftlist/:slug", async (req, res) => {
  const token = "hdlnzauscxe4xidt7sph"; // tvůj API token
  try {
    const r = await fetch(`https://api.craftlist.org/server/${req.params.slug}?token=${token}`);
    const data = await r.json();

    const lastVote = data?.votes?.[0];
    const lastVoter = lastVote?.username ?? null;

    res.json({
      votes: data?.votes_count ?? data?.votes ?? null,
      position: data?.position ?? null,
      lastVoter,
    });
  } catch (err) {
    res.status(500).json({ error: "Chyba Craftlist API" });
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
  try {
    const r = await fetch(`https://minebook.eu/api/server/${req.params.id}`);
    const data = await r.json();

    const lastVote = data?.votes?.[0];
    const lastVoter = lastVote?.username ?? null;

    res.json({
      votes: data?.votes ?? null,
      position: data?.position ?? null,
      lastVoter,
    });
  } catch (err) {
    res.status(500).json({ error: "Chyba Minebook API" });
  }
});

app.listen(PORT, () => {
  console.log(`API server běží na portu ${PORT}`);
});