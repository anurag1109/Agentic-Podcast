# Agentic Podcast Node Gemini

An AI-powered podcast episode generator that automates the complete workflow from topic research to final script production using multi-agent orchestration and Google's Gemini API.

## 🎯 Features

- **Multi-Agent Orchestration:** Sequential pipeline with 5 specialized AI agents
- **Automated Workflow:** From research → planning → writing → editing → critiquing
- **Gemini AI Integration:** Leverages Google's Generative AI for high-quality content
- **REST API:** Simple HTTP endpoints to trigger podcast generation
- **Markdown Output:** Generated scripts saved to `outputs/` folder for easy sharing
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
```

- **PORT:** Server port (default: 5000)
- **GEMINI_API_KEY:** Your Google Gemini API key
- **GEMINI_MODEL:** Model to use (e.g., `gemini-3.1-flash-lite-preview`)

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

### Generate Podcast Episode

**Endpoint:** `POST /api/podcast/generate`

**Request Body:**

```json
{
  "topic": "Your podcast topic here"
}
```

**Response:**

- Orchestrates all 5 agents through the workflow
- Returns the final podcast script as markdown
- Saves output to `outputs/` folder with timestamp

**Example:**

```bash
curl -X POST http://localhost:5000/api/podcast/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "The Future of AI"}'
```

### Health Check

**Endpoint:** `GET /api/podcast/`

Returns: `Podcast Generation API is running!`

## 🏗️ Project Structure

```
agentic-podcast-node/
├── src/
│   ├── server.js                 # Express server entry point
│   ├── agents/                   # AI agent implementations
│   │   ├── researchAgent.js      # Research & fact gathering
│   │   ├── plannerAgent.js       # Episode structure planning
│   │   ├── writerAgent.js        # Script writing
│   │   ├── editorAgent.js        # Refinement & polishing
│   │   └── criticAgent.js        # QA & feedback
│   ├── controllers/
│   │   └── podcast.controller.js # Request handler
│   ├── orchestrator/
│   │   └── runCrew.js            # Workflow orchestration logic
│   ├── routes/
│   │   └── podcast.routes.js     # API route definitions
│   └── services/
│       └── gemini.js             # Gemini API wrapper
├── outputs/                      # Generated podcast scripts
├── package.json
├── .env                          # Environment variables
└── README.md
```

## 🤖 Agent Workflow

The application uses a sequential 5-stage agent pipeline:

1. **Research Agent** → Gathers relevant information and trends about the topic
2. **Planner Agent** → Creates a structured outline and episode format
3. **Writer Agent** → Drafts the complete podcast script for two hosts
4. **Editor Agent** → Polishes language, flow, and presentation
5. **Critic Agent** → Reviews for quality and identifies improvements

Each agent receives outputs from previous stages for context and continuity.

## 📚 Documentation

- **[Server Architecture Guide](./SERVER_ARCHITECTURE_GUIDE.md)** — Detailed system design and flow
- **[Detailed Code Walkthrough](./DETAILED_CODE_WALKTHROUGH.md)** — In-depth code explanations
- **[Visual Flowcharts](./VISUAL_FLOWCHARTS.md)** — Architecture diagrams and workflows
- **[Quick Reference](./QUICK_REFERENCE.md)** — Common tasks and commands

## 🛠️ Technology Stack

- **Runtime:** Node.js (ES6+)
- **Framework:** Express.js (v4.19.2)
- **AI Engine:** Google Generative AI SDK (v0.24.1)
- **Environment:** dotenv (v16.4.5)
- **Development:** nodemon (v3.1.0)

## 📄 License

MIT

## 👤 Author

Created as an AI-powered podcast generation system.
