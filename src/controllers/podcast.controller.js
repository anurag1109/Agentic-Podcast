const { runCrew } = require("../orchestrator/runCrew");
exports.generatePodcast = async (req, res) => {
  try {
    res.json(await runCrew(req.body.topic || "AI Trends"));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
