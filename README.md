# Agentic Podcast Generator

An AI-powered podcast episode generator that automates the complete workflow from topic research to final audio production using multi-agent orchestration and Google's Gemini API.

## 🎯 Features

- **Multi-Agent Orchestration:** Sequential pipeline with 5 specialized AI agents
- **Automated Workflow:** From research → planning → writing → editing → critiquing
- **Gemini AI Integration:** Leverages Google's Generative AI for high-quality content
- **🎙️ Audio Generation:** Convert scripts to professional podcast audio with Gemini TTS
- **Multi-Speaker Support:** Automatic voice differentiation between two hosts
- **REST API:** Simple HTTP endpoints to trigger podcast generation or audio conversion
- **Markdown Output:** Generated scripts saved to `outputs/` folder for easy sharing
- **WAV Audio Files:** High-quality 24KHz audio files with proper WAV formatting
- **Reusable Content:** Generate audio from existing podcast files without regenerating workflow
- **Hot-Reload Development:** nodemon support for development workflow

## 📋 Prerequisites

- **Node.js** v16+ (or higher)
- **npm** or **yarn**
- **Google Gemini API Key** (get one at [Google AI Studio](https://aistudio.google.com))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd agentic-podcast-node
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.1-flash-lite-preview
GEMINI_AUDIO_MODEL=gemini-2.5-pro-preview-tts
```

- **PORT:** Server port (default: 5000)
- **GEMINI_API_KEY:** Your Google Gemini API key
- **GEMINI_MODEL:** Text generation model (e.g., `gemini-3.1-flash-lite-preview`)
- **GEMINI_AUDIO_MODEL:** Audio/TTS model (e.g., `gemini-2.5-pro-preview-tts`)

### 4. Start the Server

**Production mode:**

```bash
npm start
```

**Development mode (with hot-reload):**

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Generate Podcast Episode & Audio

**Endpoint:** `POST /api/podcast/generate`

#### Option 1: Generate from Topic (Full Workflow)

**Request:**

```json
{
  "topic": "Your podcast topic here"
}
```

**Flow:**

1. Research Agent gathers information
2. Planner Agent creates episode structure
3. Writer Agent drafts two-host script
4. Editor Agent polishes the script
5. Audio is automatically generated with Gemini TTS

**Example:**

```bash
curl -X POST http://localhost:5000/api/podcast/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "The Future of Artificial Intelligence"}'
```

#### Option 2: Convert Existing File to Audio (Skip Generation)

**Request:**

```json
{
  "filename": "podcast-1776793139286.md"
}
```

This skips the entire research/planning/writing workflow and directly converts an existing script to audio.

**Example:**

```bash
curl -X POST http://localhost:5000/api/podcast/generate \
  -H "Content-Type: application/json" \
  -d '{"filename": "podcast-1776793139286.md"}'
```

**Response (both options):**

```json
{
  "topic": "Your topic",
  "file": "outputs/podcast-filename.md",
  "script": "The finalized podcast script...",
  "logs": ["research done", "plan done", "draft done", "edit done"],
  "audio": {
    "fileName": "podcast-filename.wav",
    "filePath": "/absolute/path/to/file.wav",
    "url": "/outputs/podcast-filename.wav"
  }
}
```

### List Available Podcast Files

**Endpoint:** `GET /api/podcast/files`

Returns all podcast files available in the `outputs/` folder for quick audio conversion.

**Example:**

```bash
curl http://localhost:5000/api/podcast/files
```

**Response:**

```json
{
  "available_files": [
    "podcast-1776793139286.md",
    "podcast-1776802121934.md",
    "The Future of AI.md"
  ],
  "count": 3
}
```

### Health Check

**Endpoint:** `GET /api/podcast/`

**Returns:** `Podcast Generation API is running!`

## 🏗️ Project Structure

```
agentic-podcast-node/
├── src/
│   ├── server.js                 # Express server entry point
│   ├── agents/                   # AI agent implementations
│   │   ├── researchAgent.js      # Research & fact gathering
│   │   ├── plannerAgent.js       # Episode structure planning
│   │   ├── writerAgent.js        # Two-host script writing
│   │   ├── editorAgent.js        # Script refinement & polishing
│   │   └── criticAgent.js        # Quality assurance & feedback
│   ├── controllers/
│   │   └── podcast.controller.js # Request handler
│   ├── orchestrator/
│   │   └── runCrew.js            # Workflow orchestration logic
│   ├── routes/
│   │   └── podcast.routes.js     # API route definitions
│   └── services/
│       ├── gemini.js             # Gemini API wrapper (text)
│       └── geminiVoice.js        # Gemini TTS audio generation
├── outputs/                      # Generated scripts & audio files
├── package.json
├── .env                          # Environment variables (add to .gitignore)
└── README.md
```

## 🤖 Agent Workflow

The application uses a sequential 5-stage agent pipeline:

### 1. **Research Agent**

Gathers comprehensive information:

- Accurate facts and statistics with sources
- Expert perspectives and industry insights
- Real-world examples and case studies
- Current trends and future outlook
- Practical takeaways for listeners

### 2. **Planner Agent**

Creates detailed episode structure:

- Compelling opening hook (0-2 min)
- Clear introduction with value proposition (2-5 min)
- 3-4 main content segments with varied pacing (5-35 min)
- Natural transitions and engagement points
- Strong conclusion with summary (35-42 min)
- Memorable outro and call-to-action (42-45 min)

### 3. **Writer Agent**

Drafts natural, conversational script:

- Two distinct host personalities (Host 1 & Host 2)
- Natural dialogue and interruptions
- Conversational tone (not lecture-style)
- Emotional engagement and storytelling
- Vocal direction markers ([PAUSE], [LAUGH], [EMPHASIS])
- Real examples and relatable moments

### 4. **Editor Agent**

Refines script to broadcast quality:

- Polishes dialogue for naturalness
- Improves clarity and accessibility
- Enhances pacing and rhythm
- Strengthens host chemistry
- Removes anything sounding robotic
- Ensures smooth transitions

### 5. **Critic Agent**

Provides quality assurance:

- Rates engagement (1-10 scale)
- Validates information accuracy
- Assesses host dynamics
- Checks pacing and flow
- Evaluates listener value
- Identifies areas for improvement

## 🎙️ Audio Generation (Gemini TTS)

### Features

- **Multi-Speaker Support:** Automatic voice differentiation (Kore for Host 1, Puck for Host 2)
- **Emotional Delivery:** Natural tone variation, pacing, and emphasis
- **High Quality:** 24KHz sample rate, 16-bit mono audio
- **WAV Format:** Properly formatted with complete WAV headers
- **Professional Sound:** Conversational, engaging delivery (not robotic)

### Voice Options (30+ available)

- **Kore** - Firm, professional (Host 1)
- **Puck** - Upbeat, engaging (Host 2)
- **Charon** - Informative
- **Fenrir** - Excitable
- **Aoede** - Breezy
- **Algieba** - Smooth
- And 24 more options...

### Audio Output

- **Format:** WAV (24KHz, 16-bit, mono)
- **Location:** `/outputs/{filename}.wav`
- **Playback:** Compatible with all major audio players
- **File Size:** ~2.5 MB per minute of audio

## 📚 Documentation

- **[Server Architecture Guide](./SERVER_ARCHITECTURE_GUIDE.md)** — Detailed system design and flow
- **[Detailed Code Walkthrough](./DETAILED_CODE_WALKTHROUGH.md)** — In-depth code explanations
- **[Visual Flowcharts](./VISUAL_FLOWCHARTS.md)** — Architecture diagrams and workflows
- **[Quick Reference](./QUICK_REFERENCE.md)** — Common tasks and commands

## 🛠️ Technology Stack

- **Runtime:** Node.js (ES6+)
- **Framework:** Express.js (v4.22+)
- **AI Engine:** Google Generative AI SDK (v0.24.1+)
- **Audio Processing:** wav (v1.0.2) for WAV file generation
- **Environment:** dotenv (v16.6.1+)
- **Development:** nodemon (v3.1.0+)

## 📦 Dependencies

```json
{
  "name": "agentic-podcast-node",
  "version": "1.0.0",
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "express": "^4.22.1",
    "dotenv": "^16.6.1",
    "wav": "^1.0.2",
    "crypto": "^1.0.1",
    "fs-extra": "^11.3.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

## 📊 Usage Examples

### Example 1: Full Workflow - Generate & Audio

```bash
curl -X POST http://localhost:5000/api/podcast/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Latest Developments in Machine Learning"
  }'
```

Result: Creates markdown script + generates audio WAV file

### Example 2: Quick Audio Conversion

```bash
curl -X POST http://localhost:5000/api/podcast/generate \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "blockchain-trends.md"
  }'
```

Result: Converts existing markdown to audio (2-3 min processing)

### Example 3: Check Available Files

```bash
curl http://localhost:5000/api/podcast/files
```

Result: Lists all podcasts ready for audio conversion

## 👤 Support

Created as a comprehensive AI-powered podcast generation system using multi-agent orchestration and Generative AI.

For issues or questions, please check the troubleshooting section or refer to the official documentation files.
