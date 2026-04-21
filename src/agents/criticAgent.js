const { ask } = require("../services/gemini");
async function run(input) {
  const prompt = `You are Critic Agent. Role:QA specialist\nInput:${JSON.stringify(input, null, 2)}\nTask:Review weaknesses.`;
  return await ask(prompt);
}
module.exports = { run };
