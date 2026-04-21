const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
});
async function ask(prompt) {
  const r = await model.generateContent(prompt);
  return r.response.text();
}
module.exports = { ask };
