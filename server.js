const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) {
      return res.json([]);
    }

    const page = Number(req.query.page || 1);
    const limit = 20;
    const offset = (page - 1) * limit;

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      q
    )}&media=music&limit=${limit}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data.results);
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
