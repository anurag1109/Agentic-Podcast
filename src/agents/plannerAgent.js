const { ask } = require("../services/gemini");
async function run(input) {
  const prompt = `You are Planner Agent. Role:Planner specialist\nInput:${JSON.stringify(input, null, 2)}\nTask:Create outline.`;
  return await ask(prompt);
}
module.exports = { run };
