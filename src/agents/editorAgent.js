const { ask } = require("../services/gemini");
async function run(input) {
  const prompt = `You are Editor Agent. Role:Editor specialist\nInput:${JSON.stringify(input, null, 2)}\nTask:Improve script.`;
  return await ask(prompt);
}
module.exports = { run };
