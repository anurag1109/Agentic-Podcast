const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const wav = require("wav");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Enhanced prompt for podcast-quality audio
function createPodcastPrompt(text) {
  return `You are a professional podcast host with excellent speaking skills. 
Generate high-quality podcast audio from this content:

DELIVERY INSTRUCTIONS:
- Speak with natural emotion and enthusiasm appropriate to the content
- Vary your tone, pace, and emphasis throughout - avoid monotone delivery
- Add natural pauses between sentences for better flow
- Emphasize key points and takeaways
- Sound engaging and conversational, like talking to a friend
- Use vocal inflection to show excitement, curiosity, or emphasis where appropriate
- Slow down on complex points, speed up on exciting ones
- Add warmth and personality to your voice
- Sound professional but friendly, not robotic

CONTENT TO NARRATE:
${text}

Make this sound like a real podcast episode that listeners would want to hear.`;
}

// Properly write WAV file with header
async function saveWaveFile(
  filename,
  pcmData,
  channels = 1,
  rate = 24000,
  sampleWidth = 2,
) {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    writer.on("finish", resolve);
    writer.on("error", reject);

    writer.write(pcmData);
    writer.end();
  });
}

async function generatePodcastAudio(text, file) {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_AUDIO_MODEL || "gemini-2.5-pro-preview-tts",
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: createPodcastPrompt(text),
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: [
            {
              speaker: "Host 1",
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Kore",
                },
              },
            },
            {
              speaker: "Host 2",
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Puck",
                },
              },
            },
          ],
        },
      },
    },
  });

  const part = result.response.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData,
  );
  if (!part) throw new Error("No audio returned");

  const pcmData = Buffer.from(part.inlineData.data, "base64");
  const outputDir = path.join(process.cwd(), "outputs");
  fs.mkdirSync(outputDir, { recursive: true });

  // Generate filename
  let wavFileName;
  if (file) {
    const baseName = path.basename(file);
    wavFileName = baseName.replace(/\.[^/.]+$/, ".wav");
  } else {
    wavFileName = `${crypto.randomUUID()}.wav`;
  }
  const wavFilePath = path.join(outputDir, wavFileName);

  // Save with proper WAV header
  await saveWaveFile(wavFilePath, pcmData, 1, 24000, 2);

  console.log(`✓ Podcast audio generated: ${wavFileName}`);

  return {
    fileName: wavFileName,
    filePath: wavFilePath,
    url: `/outputs/${wavFileName}`,
  };
}

module.exports = { generatePodcastAudio };
