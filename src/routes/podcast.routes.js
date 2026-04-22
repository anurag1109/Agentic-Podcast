const r = require("express").Router();
const fs = require("fs");
const path = require("path");
const { generatePodcast } = require("../controllers/podcast.controller");

r.post("/generate", generatePodcast);

// List available podcast files in outputs folder
r.get("/files", (_, res) => {
  try {
    const outputsPath = path.join(__dirname, "../../outputs");
    const files = fs.readdirSync(outputsPath);
    res.json({ available_files: files, count: files.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

r.get("/", (_, res) => {
  res.send("Podcast Generation API is running!");
});

module.exports = r;
