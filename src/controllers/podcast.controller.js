const fs = require("fs");
const path = require("path");
const { runCrew } = require("../orchestrator/runCrew");
const { generatePodcastAudio } = require("../services/geminiVoice");

exports.generatePodcast = async (req, res) => {
  try {
    const { topic, filename } = req.body;
    let finalScript;
    let workflow = {};

    // Option 1: Use existing podcast file from outputs folder
    if (filename) {
      const filePath = path.join(__dirname, "../../outputs", filename);

      // Verify file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `File not found: ${filename}` });
      }

      // Read the existing podcast script
      finalScript = fs.readFileSync(filePath, "utf-8");
      workflow = { script: finalScript, source: "file", file: filename };
      console.log(`✓ Loaded podcast from file: ${filename}`);
    }
    // Option 2: Generate new podcast from topic
    else if (topic) {
      workflow = await runCrew(topic);
      finalScript = workflow.script || "No script generated";
      console.log("✓ Generated new podcast from topic");
    }
    // No input provided
    else {
      return res.status(400).json({
        error:
          "Either 'topic' (for new generation) or 'filename' (from outputs folder) is required",
      });
    }

    // Generate audio from the script
    const audio = await generatePodcastAudio(finalScript, workflow.file);
    console.log("✓ Audio generation completed");

    res.json({ ...workflow, audio });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
