const fs = require("fs");
const path = require("path");
const research = require("../agents/researchAgent");
const planner = require("../agents/plannerAgent");
const writer = require("../agents/writerAgent");
const editor = require("../agents/editorAgent");
const critic = require("../agents/criticAgent");
async function runCrew(topic) {
  const memory = { topic, logs: [] };
  memory.research = await research.run({ topic });
  memory.logs.push("research done");
  memory.plan = await planner.run({ topic, research: memory.research });
  memory.logs.push("plan done");
  memory.draft = await writer.run({
    topic,
    outline: memory.plan,
    research: memory.research,
  });
  memory.logs.push("draft done");
  memory.finalScript = await editor.run({ draft: memory.draft });
  memory.logs.push("edit done");
  // memory.review = await critic.run({ script: memory.finalScript });
  // memory.logs.push("review done");
  const out = "outputs";
  if (!fs.existsSync(out)) fs.mkdirSync(out);
  const file = path.join(out, `${topic}.md`);
  const content = `**How I proceed**

**1. Research:**
${memory.research}

-------------

**2. Plan:**
${memory.plan}

-------------

**3. Draft/Write:**
${memory.draft}

-------------

**4. Edit/Finalize:**
${memory.finalScript}

-------------
-------------
-------------

**My Final Script:**
${memory.finalScript}`;

  fs.writeFileSync(file, content);

  return {
    topic,
    file,
    logs: memory.logs,
    research: memory.research,
    outline: memory.plan,
    // review: memory.review,
    script: memory.finalScript,
  };
}
module.exports = { runCrew };
