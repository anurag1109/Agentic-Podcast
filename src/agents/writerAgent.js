const { ask } = require("../services/gemini");
async function run(input) {
  const prompt = `You are Writer Agent. Role:Writer specialist\nInput:${JSON.stringify(input, null, 2)}\nTask:Write two host script.`;
  return await ask(prompt);
}
module.exports = { run };
