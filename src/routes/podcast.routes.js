const r = require("express").Router();
const { generatePodcast } = require("../controllers/podcast.controller");
r.post("/generate", generatePodcast);
module.exports = r;
r.get("/", (_, res) => {
  res.send("Podcast Generation API is running!");
});
