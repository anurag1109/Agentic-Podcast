const { ask } = require("../services/gemini");

async function run(input) {
  const prompt = `You are a Professional Podcast Script Writer creating engaging dialogue between two hosts.

OUTLINE: ${JSON.stringify(input, null, 2)}

WRITE a natural, conversational script with:

1. NATURAL DIALOGUE:
   - Sound like real people talking, not reading
   - Use contractions ("we're", "it's", "don't")
   - Include natural interruptions and overlaps
   - Build genuine chemistry between hosts

2. HOST PERSONALITIES:
   - Host 1: Expert, confident, drives narrative
   - Host 2: Curious, respectful, asks important questions
   - Distinct speaking styles with genuine interaction

3. ENGAGEMENT:
   - Vary dialogue length (max 30-45 seconds per speaker)
   - Include reactions to information ("That's fascinating!")
   - Ask thoughtful questions to listeners
   - Create moments of clarity and insight

4. PACING MARKERS:
   - Include [PAUSE] for emphasis
   - Include [LAUGH] for natural moments
   - Add smooth transitions between segments

5. FORMAT:
Host 1: [Natural dialogue]
[PAUSE]
Host 2: [Conversational response]

CREATE: A script that sounds like two smart friends having a meaningful conversation, not a lecture.`;
  return await ask(prompt);
}

module.exports = { run };
