const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Resonance backend is running");
});
app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await axios.get("https://itunes.apple.com/search", {
      params: {
        term: query,
        media: "music",
        limit: 20,
      },
    });

    const results = response.data.results.map((item) => ({
      id: item.trackId,
      title: item.trackName,
      artist: item.artistName,
      albumArt: item.artworkUrl100,
      previewUrl: item.previewUrl,
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

