# GitHub Copilot Instructions for Agentic Podcast Node Gemini

## Project Overview

This is an agentic podcast workflow orchestrator built with Node.js and Google Gemini API. The application automates podcast episode creation through a multi-agent workflow.

### Technology Stack

- **Runtime:** Node.js (ES6+)
- **Framework:** Express.js (v4.19.2)
- **AI Engine:** Google Generative AI (@google/generative-ai v0.24.1)
- **Environment:** dotenv for configuration
- **Development:** nodemon for hot-reload

### Project Purpose

Generate complete podcast episodes automatically by orchestrating 5 specialized AI agents through a sequential workflow. Users submit a topic via REST API and receive a polished podcast script output as markdown.

## Architecture

### Core Workflow Execution (Main Orchestrator)

**File:** `src/orchestrator/runCrew.js`

Sequential agent pipeline that processes a topic through 5 stages:

1. **Research Agent** → Gathers facts and trends related to topic
2. **Planner Agent** → Creates episode outline and structure
3. **Writer Agent** → Drafts podcast script for two hosts
4. **Editor Agent** → Polishes and refines the script
5. **Critic Agent** → QA review identifying weaknesses

Each agent receives the output from previous stages for context. The workflow maintains a memory object tracking all outputs and logs. Final script is saved as markdown in `outputs/` folder.

### Agent Architecture Pattern

**Files:** `src/agents/*.js` (research, planner, writer, editor, critic)

All agents follow the same pattern:

- Receive structured input (props) via `run()` function
- Construct detailed prompt with role, input context, and task
- Call `gemini.ask()` to get Gemini API response
- Return response text directly

### Gemini API Service

**File:** `src/services/gemini.js`

Wrapper around Google Generative AI:

- Model: `gemini-2.0-flash` (configurable via env)
- Handles all Gemini API calls
- Single `ask(prompt)` function returns text response
- Requires `GEMINI_API_KEY` environment variable

### API Layer

**Files:**

- `src/routes/podcast.routes.js` → Route definitions
- `src/controllers/podcast.controller.js` → Endpoint handler

Current endpoint:

- `POST /api/podcast/generate` → Accepts `topic` in request body, calls `runCrew()`, returns entire workflow output

### Server

**File:** `src/server.js`

Express server:

- Port: 5000 (or PORT env var)
- JSON middleware enabled
- Single route mount: `/api/podcast`
- Minimal setup for podcast orchestration

## Environment Configuration

Required environment variables:

- `GEMINI_API_KEY` → Google Gemini API key
- `GEMINI_MODEL` (optional) → AI model selection, defaults to `gemini-2.0-flash`
- `PORT` (optional) → Server port, defaults to 5000

## Coding Preferences

### Code Style

- Use clear, modular JavaScript with ES6+ syntax (async/await, destructuring, arrow functions)
- Follow the existing agent pattern for consistency
- Keep functions focused and single-responsibility
- Add JSDoc comments to exported functions
- Use `const`/`let`, no `var`

### Agent Development

- All new agents must follow the existing pattern: `module.exports = { run }`
- Prompt engineering is key: include role, input context, and clear task in prompt
- Each agent should receive previous stage outputs for context enrichment

### Error Handling

- Wrap async operations in try/catch at controller level
- Return meaningful error messages to client
- Log errors before responding

### Memory/Output

- Maintain memory object pattern in orchestrator for stage tracking
- Always save final output to `outputs/` folder with timestamp
- Return comprehensive response object with all intermediate results

## File Structure Reference

```
src/
├── server.js                    # Express app setup
├── services/
│   └── gemini.js               # Gemini API wrapper
├── agents/                      # AI agents (all follow same pattern)
│   ├── researchAgent.js
│   ├── plannerAgent.js
│   ├── writerAgent.js
│   ├── editorAgent.js
│   └── criticAgent.js
├── orchestrator/
│   └── runCrew.js              # Main workflow orchestration
├── controllers/
│   └── podcast.controller.js    # Request handlers
└── routes/
    └── podcast.routes.js        # Route definitions
outputs/                         # Generated podcast scripts (created at runtime)
```

## Common Development Tasks

### Add New Agent

1. Create `src/agents/newAgent.js`
2. Follow pattern: `run(input)` function with prompt engineering
3. Import and add to `runCrew.js` pipeline in desired sequence
4. Export in complete response object in `runCrew.js`

### Modify Prompts

- Edit prompt strings in respective agent files
- Include role, input JSON, and task description
- Test with `/api/podcast/generate` endpoint

### Add New Endpoint

1. Add route to `src/routes/podcast.routes.js`
2. Create corresponding controller in `src/controllers/podcast.controller.js`
3. Controller should call appropriate orchestrator function
4. Return comprehensive response with results

### Configure Gemini Model

- Use `.env` file: `GEMINI_MODEL=gemini-pro`
- Or set environment variable before running

## Running the Application

```bash
npm install              # Install dependencies
npm run dev              # Development with hot-reload
# or
npm start                # Production run
```

API will be available at `http://localhost:5000/api/podcast/generate`

## Important Notes

- **Never commit** `GEMINI_API_KEY` or `.env` file to repository
- **API Rate Limits:** Gemini API has usage limits; monitor quota
- **Output Files:** Generated podcasts accumulate in `outputs/` folder
- **Prompt Quality:** Podcast quality depends on prompt engineering in agents
- **Sequential Processing:** Current design runs agents sequentially; add `Promise.all()` if parallelization needed
- When suggesting new features, maintain agent-based architecture pattern
