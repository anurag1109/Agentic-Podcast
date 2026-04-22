const { ask } = require("../services/gemini");

async function run(input) {
  const prompt = `You are a Professional Podcast Structure Agent designing a compelling 30-45 minute episode.

RESEARCH: ${JSON.stringify(input, null, 2)}

DESIGN a detailed outline with:

1. HOOK (0-2 min): Attention-grabbing opening that makes listeners want to keep listening
2. INTRO (2-5 min): Why this topic matters NOW and what listeners will learn
3. MAIN CONTENT (5-35 min): 3-4 logical segments with:
   - Clear topics and hooks
   - Key discussion points
   - Real examples/stories
   - Varied pacing and energy
4. EXPERT PERSPECTIVES: Different viewpoints and angles
5. LISTENER ENGAGEMENT: Questions, pause moments, relatable connections
6. CONCLUSION (35-42 min): Key takeaways, connect to opening, actionable insights
7. OUTRO (42-45 min): Strong closing and call-to-action

FORMAT: Detailed roadmap with timing, talking points, transitions, and pacing notes.`;
  return await ask(prompt);
}

module.exports = { run };
