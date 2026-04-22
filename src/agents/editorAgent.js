const { ask } = require("../services/gemini");

async function run(input) {
  const prompt = `You are a Professional Podcast Script Editor elevating content to broadcast quality.

SCRIPT: ${JSON.stringify(input, null, 2)}

POLISH the script by:

1. DIALOGUE QUALITY:
   - Make language natural and conversational
   - Remove awkward phrasing or stilted exchanges
   - Add personality and warmth
   - Smooth transitions between topics

2. CLARITY:
   - Ensure concepts are explained clearly
   - Make complex ideas accessible
   - Remove or define jargon
   - Verify logical flow

3. PACING:
   - Vary sentence lengths
   - Add [PAUSE] at strategic moments
   - Create rhythm and cadence
   - Balance segment lengths

4. ENGAGEMENT:
   - Strengthen opening hook
   - Add surprising insights
   - Enhance storytelling moments
   - Make takeaways memorable

5. HOST CHEMISTRY:
   - Equal airtime for both hosts
   - Include friendly debate/agreement moments
   - Natural interruptions and overlaps
   - Genuine interaction

6. AUTHENTICITY:
   - Remove anything sounding robotic
   - Add conversational bridging phrases
   - Make transitions organic
   - Sound like real people

OUTPUT: A polished, professional podcast script ready for audio generation.`;
  return await ask(prompt);
}

module.exports = { run };
