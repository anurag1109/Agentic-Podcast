# Agentic Podcast Node Gemini

Agentic Podcast Node Gemini is a modular Node.js application for orchestrating podcast episode creation using agent-based workflows and Google's Gemini API for advanced AI content generation.

## Features

- Modular agent architecture (Research, Planner, Writer, Editor, Critic)
- Podcast episode planning and script generation
- Gemini API integration for AI-powered content
- REST API for orchestrating podcast workflows

## Project Structure

```
agentic-podcast-node-gemini/
├── package.json
├── README.md
├── src/
│   ├── server.js
│   ├── agents/
│   │   ├── criticAgent.js
│   │   ├── editorAgent.js
│   │   ├── plannerAgent.js
│   │   ├── researchAgent.js
│   │   └── writerAgent.js
│   ├── controllers/
│   │   └── podcast.controller.js
│   ├── orchestrator/
│   │   └── runCrew.js
│   ├── routes/
│   │   └── podcast.routes.js
│   └── services/
│       └── gemini.js
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure Gemini API:**
   - Set your Gemini API key in an environment variable or configuration file as required by `src/services/gemini.js`.
3. **Run the server:**
   ```bash
   node src/server.js
   ```

## API Endpoints

- `POST /podcast/plan` — Generate a podcast plan
- `POST /podcast/write` — Generate a podcast script
- `POST /podcast/edit` — Edit a podcast script
- `POST /podcast/critic` — Critique a podcast script

## Agents

- **Research Agent:** Gathers information for podcast topics.
- **Planner Agent:** Outlines episode structure.
- **Writer Agent:** Drafts the script.
- **Editor Agent:** Refines and polishes the script.
- **Critic Agent:** Provides feedback and suggestions.

## License

MIT
