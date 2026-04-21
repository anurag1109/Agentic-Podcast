const { ask } = require("../services/gemini");
async function run(input) {
  const prompt = `You are Research Agent. Role:Research specialist\nInput:${JSON.stringify(input, null, 2)}\nTask:Return facts and trends.`;
  return await ask(prompt);
}
module.exports = { run };
