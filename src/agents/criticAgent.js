const { ask } = require("../services/gemini");

async function run(input) {
  const prompt = `You are a Professional Podcast Critic providing final quality assurance.

SCRIPT: ${JSON.stringify(input, null, 2)}

CRITICAL REVIEW:

1. ENGAGEMENT (Rate 1-10):
   - Does opening hook immediately grab attention?
   - Would listeners keep listening?
   - Are there enough compelling moments?
   - Is the conclusion satisfying?

2. INFORMATION QUALITY:
   - Is all information accurate and current?
   - Are facts well-supported?
   - Is information valuable to listeners?
   - Any gaps or misleading content?

3. HOST DYNAMICS:
   - Do hosts sound natural and engaged?
   - Is their interaction genuine?
   - Do both contribute equally?
   - Do they have distinct personalities?

4. PACING & FLOW:
   - Smooth transitions throughout?
   - Consistent energy levels?
   - Varied pace to maintain interest?
   - Any awkward segments?

5. CLARITY:
   - Is the topic explained clearly?
   - Would general audience understand?
   - Is jargon explained?
   - Do complex concepts make sense?

6. EMOTIONAL IMPACT (Rate 1-10):
   - Does it create connection?
   - Any memorable moments?
   - Would listeners care?
   - Is there warmth and personality?

7. LISTENER VALUE:
   - Would they learn something valuable?
   - Are takeaways clear?
   - Would they recommend it?

PROVIDE:
- Overall quality score (1-10)
- 3-4 major strengths
- 3-4 main weaknesses with fixes
- Missed opportunities
- Ready for audio? (Yes/Minor tweaks/Major revisions)`;
  return await ask(prompt);
}

module.exports = { run };
