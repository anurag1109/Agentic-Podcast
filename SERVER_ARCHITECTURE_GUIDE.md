# Agentic Podcast Server - Complete Architecture Guide

## Table of Contents

1. [Server Startup Flow](#server-startup-flow)
2. [Agent Architecture Overview](#agent-architecture-overview)
3. [Agent Roles & Responsibilities](#agent-roles--responsibilities)
4. [Request Flow Diagram](#request-flow-diagram)
5. [Agent Communication Pipeline](#agent-communication-pipeline)
6. [Data Flow Between Agents](#data-flow-between-agents)
7. [Detailed Execution Steps](#detailed-execution-steps)
8. [Technology Stack](#technology-stack)

---

## Server Startup Flow

### What Happens When You Run `npm start`

```
1. npm start command executed
   ↓
2. Node.js loads src/server.js
   ↓
3. Express.js is initialized
   ↓
4. dotenv loads environment variables (.env file)
   ↓
5. Express middleware configured (express.json())
   ↓
6. Routes registered (/api/podcast route)
   ↓
7. Server listens on PORT (default: 5000)
   ↓
8. Server ready to accept HTTP requests
   ↓
9. "running" message logged to console
```

### Step-by-Step Breakdown:

#### Step 1: Node Execution

```javascript
// File: src/server.js (Line 1)
const express = require("express");
require("dotenv").config();
```

- **What happens**: Node.js reads the server.js file
- **Why**: This is the entry point of your entire application
- **Result**: Express framework is imported and environment variables are loaded

#### Step 2: App Initialization

```javascript
// File: src/server.js (Line 2-3)
const app = express();
app.use(express.json());
```

- **What happens**:
  - Express application is created (the main web server)
  - JSON middleware is registered to parse incoming JSON requests
- **Why**: JSON middleware tells Express to automatically parse request bodies that contain JSON data
- **Result**: App can now handle JSON requests

#### Step 3: Route Registration

```javascript
// File: src/server.js (Line 4)
app.use("/api/podcast", require("./routes/podcast.routes"));
```

- **What happens**: All routes starting with `/api/podcast` are registered
- **Why**: This tells Express where to find route handlers
- **Result**: HTTP requests to `/api/podcast/*` will be handled by the routes file

#### Step 4: Server Listening

```javascript
// File: src/server.js (Line 5)
app.listen(process.env.PORT || 5000, () => console.log("running"));
```

- **What happens**:
  - Server binds to a port (5000 by default or from .env)
  - Server waits for incoming HTTP connections
- **Why**: This is where the server becomes "active"
- **Result**: Server is now ready to accept requests

---

## Agent Architecture Overview

Your application uses a **Multi-Agent System** pattern where 5 specialized AI agents work sequentially, each with a unique role in podcast creation.

### Visual Overview:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AGENTIC PODCAST SYSTEM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐                                              │
│  │   INPUT      │                                              │
│  │  (Topic)     │                                              │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │         RESEARCH AGENT 🔍                                │ │
│  │  • Gathers facts and trends                              │ │
│  │  • Creates knowledge base                                │ │
│  │  • Output: Research Data                                 │ │
│  └─────────────────────┬──────────────────────────────────┘ │
│                        │                                      │
│                        ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │         PLANNER AGENT 📋                                 │ │
│  │  • Creates outline structure                             │ │
│  │  • Plans episode flow                                    │ │
│  │  • Output: Episode Outline                               │ │
│  └─────────────────────┬──────────────────────────────────┘ │
│                        │                                      │
│                        ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │         WRITER AGENT ✍️                                  │ │
│  │  • Writes host dialogue                                  │ │
│  │  • Creates full script                                   │ │
│  │  • Output: Draft Script                                  │ │
│  └─────────────────────┬──────────────────────────────────┘ │
│                        │                                      │
│                        ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │         EDITOR AGENT ✂️                                  │ │
│  │  • Improves writing quality                              │ │
│  │  • Fixes grammar & flow                                  │ │
│  │  • Output: Polished Script                               │ │
│  └─────────────────────┬──────────────────────────────────┘ │
│                        │                                      │
│                        ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │         CRITIC AGENT 🎯                                  │ │
│  │  • Reviews for weaknesses                                │ │
│  │  • Provides QA feedback                                  │ │
│  │  • Output: Review & Recommendations                      │ │
│  └─────────────────────┬──────────────────────────────────┘ │
│                        │                                      │
│                        ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │   OUTPUT (Saved to outputs/ folder)                      │ │
│  │   File: podcast-[timestamp].md                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Agent Roles & Responsibilities

### 1. RESEARCH AGENT 🔍

**File**: `src/agents/researchAgent.js`

**Role**: Research Specialist

**What It Does**:

- Analyzes the given topic
- Searches for relevant facts and current trends
- Gathers information to support the podcast episode
- Creates the knowledge foundation for other agents

**How It Works**:

```javascript
const prompt = `You are Research Agent. Role:Research specialist
Input:[TOPIC]
Task:Return facts and trends.`;
```

**Input**:

```json
{
  "topic": "AI Trends"
}
```

**Output Example**:

```
- Latest AI breakthroughs in 2025
- Market trends in generative AI
- Key industry players
- Regulatory developments
- Security concerns
```

**Why It's Different**:

- Uses Gemini API to access current knowledge
- Focuses on **factual accuracy** and **trend analysis**
- Output becomes foundation for all other agents

---

### 2. PLANNER AGENT 📋

**File**: `src/agents/plannerAgent.js`

**Role**: Episode Structure Planner

**What It Does**:

- Takes research data from Research Agent
- Creates a structured outline
- Plans episode flow and segments
- Defines episode pacing

**How It Works**:

```javascript
const prompt = `You are Planner Agent. Role:Planner specialist
Input:[TOPIC + RESEARCH DATA]
Task:Create outline.`;
```

**Input/Output Chain**:

```
Input from Research Agent
    ↓
Creates structure like:
  - Opening/Hook
  - Topic Introduction
  - Key Points (3-5 segments)
  - Discussion Points
  - Call-to-Action
  - Closing
    ↓
Output: Episode Outline
```

**Why It's Different**:

- Doesn't write content, only structure
- Focuses on **logical flow** and **engagement**
- Uses research as reference but doesn't duplicate information
- Output serves as blueprint for Writer Agent

---

### 3. WRITER AGENT ✍️

**File**: `src/agents/writerAgent.js`

**Role**: Content Writer

**What It Does**:

- Converts the outline into actual dialogue
- Writes conversational script for two hosts
- Creates engaging and natural language
- Produces full scriptable content

**How It Works**:

```javascript
const prompt = `You are Writer Agent. Role:Writer specialist
Input:[TOPIC + OUTLINE + RESEARCH]
Task:Write two host script.`;
```

**Input/Output Chain**:

```
Receives:
  - Topic
  - Outline (from Planner)
  - Research data (from Research Agent)
    ↓
Writes content like:
  HOST 1: "Welcome to the podcast!"
  HOST 2: "Today we're discussing AI Trends..."
    ↓
Output: Draft Script (raw, unpolished)
```

**Why It's Different**:

- Creates **actual dialogue** not just structure
- Writes for **two hosts** (conversational style)
- Uses all previous agent outputs
- Output is "draft" - not yet refined

---

### 4. EDITOR AGENT ✂️

**File**: `src/agents/editorAgent.js`

**Role**: Quality & Polish Specialist

**What It Does**:

- Takes the draft script
- Improves grammar and language
- Enhances readability and flow
- Refines tone and consistency
- Removes redundancy

**How It Works**:

```javascript
const prompt = `You are Editor Agent. Role:Editor specialist
Input:[DRAFT SCRIPT]
Task:Improve script.`;
```

**Input/Output Chain**:

```
Input: Draft Script (raw from Writer)
    ↓
Improvements:
  - Fix grammar errors
  - Enhance transitions
  - Improve pace
  - Clarify language
  - Add professional touches
    ↓
Output: Polished Script (refined, ready-to-publish quality)
```

**Why It's Different**:

- Doesn't change content structure
- Focuses on **quality** and **presentation**
- Similar to a human editor
- Makes the script "broadcast-ready"

---

### 5. CRITIC AGENT 🎯

**File**: `src/agents/criticAgent.js`

**Role**: Quality Assurance & Feedback Specialist

**What It Does**:

- Reviews the final polished script
- Identifies any remaining weaknesses
- Provides constructive feedback
- Acts as final quality checkmark
- Suggests improvements without rewriting

**How It Works**:

```javascript
const prompt = `You are Critic Agent. Role:QA specialist
Input:[FINAL SCRIPT]
Task:Review weaknesses.`;
```

**Input/Output Chain**:

```
Input: Final Polished Script (from Editor)
    ↓
Review for:
  - Factual accuracy
  - Engagement level
  - Clarity issues
  - Missing information
  - Tone problems
    ↓
Output: Review & Recommendations
```

**Why It's Different**:

- **Doesn't modify** the script
- Provides **feedback only** (quality assurance)
- Final quality gate before delivery
- Critical eye for improvements

---

## Request Flow Diagram

When you make an HTTP request to the server:

```
CLIENT REQUEST
(HTTP POST to /api/podcast/generate)
    │
    ├─ Endpoint: POST /api/podcast/generate
    └─ Body: { "topic": "Your Topic" }

    ▼

ROUTES LAYER
(src/routes/podcast.routes.js)
    │
    ├─ Matches /api/podcast/generate route
    └─ Calls controller handler (generatePodcast)

    ▼

CONTROLLER LAYER
(src/controllers/podcast.controller.js)
    │
    ├─ Receives request
    ├─ Extracts topic from req.body
    └─ Calls runCrew orchestrator

    ▼

ORCHESTRATOR LAYER
(src/orchestrator/runCrew.js)
    │
    ├─ Initializes memory object
    ├─ Runs 5 agents sequentially
    ├─ Passes data between agents
    ├─ Logs progress
    └─ Saves final output to file

    ▼

AGENT LAYER
(src/agents/*.js)
    │
    ├─ Each agent calls Gemini API
    ├─ Processes input with custom prompt
    └─ Returns processed output

    ▼

API LAYER
(src/services/gemini.js)
    │
    ├─ Calls Google Gemini API
    ├─ Sends prompt + context
    └─ Returns generated text

    ▼

RESPONSE
(Sent back to client)
    │
    ├─ topic
    ├─ file (output file path)
    ├─ logs (execution progress)
    ├─ research (research output)
    ├─ outline (planner output)
    ├─ review (critic output)
    └─ script (final script)
```

---

## Agent Communication Pipeline

### How Agents Talk to Each Other

Each agent is **independent** but receives data from previous agents:

```
┌─ RESEARCH AGENT ────────┐
│  Input:  { topic }      │
│  Output: research_data  │ ──┐
└─────────────────────────┘   │
                              ▼
┌─ PLANNER AGENT ─────────────────────────┐
│  Input:  { topic, research_data }       │
│  Output: episode_outline                │ ──┐
└─────────────────────────────────────────┘   │
                                              ▼
┌─ WRITER AGENT ──────────────────────────────────────┐
│  Input:  { topic, outline, research_data }         │
│  Output: draft_script                              │ ──┐
└─────────────────────────────────────────────────────┘   │
                                                          ▼
┌─ EDITOR AGENT ──────────────────────┐
│  Input:  { draft_script }           │
│  Output: polished_script            │ ──┐
└─────────────────────────────────────┘   │
                                          ▼
┌─ CRITIC AGENT ───────────────────────┐
│  Input:  { polished_script }         │
│  Output: review_feedback             │
└───────────────────────────────────────┘
```

### Key Points:

1. **Sequential Execution**: Each agent waits for the previous one
2. **Data Accumulation**: Later agents have access to all previous outputs
3. **No Agent Knows About Others**: Each agent is independent, prompt-based
4. **Shared Memory**: The orchestrator maintains a "memory" object that tracks all outputs

---

## Data Flow Between Agents

### Complete Memory Object Journey:

**At Step 1 (After Research Agent)**:

```javascript
memory = {
  topic: "AI Trends",
  logs: ["research done"],
  research: "[facts and trends from Gemini...]",
};
```

**At Step 2 (After Planner Agent)**:

```javascript
memory = {
  topic: "AI Trends",
  logs: ["research done", "plan done"],
  research: "[facts and trends...]",
  plan: "[episode outline structure...]",
};
```

**At Step 3 (After Writer Agent)**:

```javascript
memory = {
  topic: "AI Trends",
  logs: ["research done", "plan done", "draft done"],
  research: "[facts and trends...]",
  plan: "[episode outline...]",
  draft: "[HOST 1: ... HOST 2: ...]",
};
```

**At Step 4 (After Editor Agent)**:

```javascript
memory = {
  topic: "AI Trends",
  logs: ["research done", "plan done", "draft done", "edit done"],
  research: "[facts and trends...]",
  plan: "[episode outline...]",
  draft: "[original draft...]",
  finalScript: "[improved script...]",
};
```

**At Step 5 (After Critic Agent)**:

```javascript
memory = {
  topic: "AI Trends",
  logs: [
    "research done",
    "plan done",
    "draft done",
    "edit done",
    "review done",
  ],
  research: "[facts and trends...]",
  plan: "[episode outline...]",
  draft: "[original draft...]",
  finalScript: "[improved script...]",
  review: "[critic feedback...]",
};
```

---

## Detailed Execution Steps

### Step-by-Step Execution Code Walkthrough

**File: `src/orchestrator/runCrew.js`**

```javascript
async function runCrew(topic) {
```

**What**: Function called with the podcast topic
**Input**: "AI Trends"

```javascript
const memory = { topic, logs: [] };
```

**What**: Initialize "memory" object to track everything
**Why**: This object persists data across all 5 agents

---

### 🔍 STEP 1: RESEARCH AGENT

```javascript
memory.research = await research.run({ topic });
memory.logs.push("research done");
```

**Execution Flow**:

1. `research.run()` is called with topic
2. Creates a prompt: `"You are Research Agent... Input: {topic}... Task: Return facts and trends"`
3. Sends prompt to Gemini API via `gemini.ask()`
4. Gemini processes and returns research facts
5. Stores result in `memory.research`
6. Logs "research done"

**What the Research Agent's Prompt Looks Like**:

```
You are Research Agent. Role:Research specialist
Input: {"topic":"AI Trends"}
Task: Return facts and trends.
```

**What Gemini Returns**:

```
- Generative AI dominance continues to grow
- GPT-5 and Gemini models competing
- Enterprise adoption accelerating
- Regulation frameworks emerging
- AI safety concerns highlighted
[etc...]
```

---

### 📋 STEP 2: PLANNER AGENT

```javascript
memory.plan = await planner.run({ topic, research: memory.research });
memory.logs.push("plan done");
```

**Execution Flow**:

1. `planner.run()` receives both `topic` and `research` data
2. Creates a prompt with BOTH inputs
3. Sends to Gemini API
4. Gemini analyzes structure and trends
5. Returns episode outline/plan
6. Stores in `memory.plan`

**What the Planner Agent's Input Looks Like**:

```json
{
  "topic": "AI Trends",
  "research": "[lots of research data from step 1]"
}
```

**What Planner Outputs**:

```
EPISODE OUTLINE:
1. Opening Hook (30 seconds)
2. Introduction to AI Trends (2 min)
3. Key Trend #1: Enterprise Adoption (3 min)
4. Key Trend #2: Safety Concerns (3 min)
5. Key Trend #3: Regulation (3 min)
6. Discussion & Analysis (2 min)
7. Closing Remarks (1 min)
```

---

### ✍️ STEP 3: WRITER AGENT

```javascript
memory.draft = await writer.run({
  topic,
  outline: memory.plan,
  research: memory.research,
});
memory.logs.push("draft done");
```

**Execution Flow**:

1. `writer.run()` receives topic, outline, AND research
2. Creates massive prompt with all three inputs
3. Sends to Gemini API
4. Gemini converts outline to actual dialogue
5. Returns full script with two host conversations
6. Stores in `memory.draft`

**What the Writer Agent's Input Looks Like**:

```json
{
  "topic": "AI Trends",
  "outline": "[episode outline from step 2]",
  "research": "[research facts from step 1]"
}
```

**What Writer Outputs**:

```
HOST 1: Welcome back to the podcast! Today we're diving into
        the hottest AI trends shaping 2025.

HOST 2: That's right. We've done extensive research on this,
        and it's fascinating stuff.

HOST 1: Let's start with enterprise adoption. According to
        recent data, we're seeing a massive shift...

HOST 2: Exactly! And what's interesting is...
[continues as full dialogue]
```

---

### ✂️ STEP 4: EDITOR AGENT

```javascript
memory.finalScript = await editor.run({ draft: memory.draft });
memory.logs.push("edit done");
```

**Execution Flow**:

1. `editor.run()` receives only the draft script
2. Creates a prompt asking for improvements
3. Sends to Gemini API
4. Gemini reviews and improves the script
5. Returns refined version
6. Stores in `memory.finalScript`

**What the Editor Agent's Input Looks Like**:

```json
{
  "draft": "[raw script from step 3]"
}
```

**What Editor Does**:

- Removes repetition
- Improves sentence structure
- Enhances transitions
- Fixes awkward phrasing
- Adds professional polish
- Ensures consistent tone

**Output**: Final polished, broadcast-ready script

---

### 🎯 STEP 5: CRITIC AGENT

```javascript
memory.review = await critic.run({ script: memory.finalScript });
memory.logs.push("review done");
```

**Execution Flow**:

1. `critic.run()` receives the final polished script
2. Creates a prompt asking for weakness review
3. Sends to Gemini API
4. Gemini provides QA feedback
5. Returns review/recommendations
6. Stores in `memory.review`

**What the Critic Agent's Input Looks Like**:

```json
{
  "script": "[polished script from step 4]"
}
```

**What Critic Returns**:

```
REVIEW FEEDBACK:
✓ Strong opening hook
✓ Good research backing
⚠ Possible length concern - might be too long
✓ Host chemistry seems natural
✓ Clear takeaways
⚠ Consider expanding on regulation angle
✓ Good closing
```

---

### 💾 STEP 6: FILE SAVING & RESPONSE

```javascript
const out = "outputs";
if (!fs.existsSync(out)) fs.mkdirSync(out);
const file = path.join(out, `podcast-${Date.now()}.md`);
fs.writeFileSync(file, memory.finalScript);
```

**What Happens**:

1. Creates "outputs" folder if it doesn't exist
2. Generates filename with timestamp (e.g., `podcast-1713700234567.md`)
3. Writes final script to that file
4. Creates permanent record of the podcast script

```javascript
return {
  topic,
  file,
  logs: memory.logs,
  research: memory.research,
  outline: memory.plan,
  review: memory.review,
  script: memory.finalScript,
};
```

**Final Response Sent Back to Client**:

```json
{
  "topic": "AI Trends",
  "file": "outputs/podcast-1713700234567.md",
  "logs": [
    "research done",
    "plan done",
    "draft done",
    "edit done",
    "review done"
  ],
  "research": "[all research data]",
  "outline": "[episode outline]",
  "review": "[critic feedback]",
  "script": "[final podcast script ready to publish]"
}
```

---

## Technology Stack

### Component Breakdown:

```
┌─────────────────────────────────────────────┐
│         CLIENT APPLICATION                  │
│    (Browser / API Client)                   │
└────────────────┬────────────────────────────┘
                 │ HTTP GET/POST
                 ▼
┌─────────────────────────────────────────────┐
│      EXPRESS.JS (Web Framework)             │
│  - Routes HTTP requests                     │
│  - Handles JSON parsing                     │
│  - Manages endpoints                        │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│     NODEJS RUNTIME ENVIRONMENT              │
│  - Executes JavaScript code                 │
│  - Manages async operations                 │
│  - File I/O operations                      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│   AGENT ORCHESTRATION SYSTEM                │
│  - Coordinates 5 agents                     │
│  - Manages data flow                        │
│  - Maintains memory object                  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│     GEMINI API (@google/generative-ai)      │
│  - AI model: gemini-2.0-flash               │
│  - Generates content                        │
│  - Processes prompts                        │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│   GOOGLE CLOUD (Internet)                   │
│  - Hosts Gemini model                       │
│  - Processes AI requests                    │
└─────────────────────────────────────────────┘
```

### Key Technologies:

| Component   | Package               | Purpose                        | Version |
| ----------- | --------------------- | ------------------------------ | ------- |
| Web Server  | express               | HTTP routing & middleware      | ^4.19.2 |
| Environment | dotenv                | Load env variables             | ^16.4.5 |
| AI Model    | @google/generative-ai | Gemini API integration         | ^0.24.1 |
| Runtime     | Node.js               | Execute JavaScript server-side | -       |
| Dev Tool    | nodemon               | Auto-restart on code change    | ^3.1.0  |

---

## Complete Request Lifecycle

### Example: User Requests "Podcast on Machine Learning"

```
CLIENT SIDE:
┌─────────────────────────────────────┐
│ User clicks "Generate Podcast"       │
│ Input: Topic = "Machine Learning"   │
└──────────────┬──────────────────────┘
               │
               ▼
         HTTP POST Request
      /api/podcast/generate
      Body: { "topic": "Machine Learning" }

SERVER SIDE:
       ↓
   EXPRESS ROUTES
   (podcast.routes.js)
       ↓
   CONTROLLER
   (podcast.controller.js)
   - Gets topic from request
       ↓
   ORCHESTRATOR
   (runCrew.js)
   - Initializes memory
       ↓
   ┌─ RESEARCH AGENT ─────┐
   │ ✓ Searches ML facts   │
   │ ✓ Gathers trends      │
   └─────────┬─────────────┘
             ↓
   ┌─ PLANNER AGENT──────────┐
   │ ✓ Creates outline       │
   │ ✓ Plans episode flow    │
   └─────────┬───────────────┘
             ↓
   ┌─ WRITER AGENT────────────────┐
   │ ✓ Writes host dialogue        │
   │ ✓ Creates full script         │
   └─────────┬────────────────────┘
             ↓
   ┌─ EDITOR AGENT────────────────┐
   │ ✓ Improves quality            │
   │ ✓ Polishes writing            │
   └─────────┬────────────────────┘
             ↓
   ┌─ CRITIC AGENT────────────────┐
   │ ✓ Reviews for weaknesses      │
   │ ✓ Provides feedback           │
   └─────────┬────────────────────┘
             ↓
        FILE SAVED
        outputs/podcast-[timestamp].md
             ↓
        JSON RESPONSE
        {
          topic, file, logs,
          research, outline,
          review, script
        }

CLIENT SIDE:
       ↓
Display Results:
- Topic confirmed
- File path
- Execution timeline (logs)
- Full podcast script ready to use
```

---

## How Agents Work Differently

### What Makes Each Agent Unique:

| Agent        | Input Focus             | Processing        | Output Type      | Role               |
| ------------ | ----------------------- | ----------------- | ---------------- | ------------------ |
| **Research** | Topic only              | Factual analysis  | Raw facts/trends | Knowledge builder  |
| **Planner**  | Facts + Topic           | Structure design  | Outline/skeleton | Content organizer  |
| **Writer**   | Outline + Facts + Topic | Dialogue creation | Full script      | Content creator    |
| **Editor**   | Script only             | Style/grammar     | Refined script   | Quality refinement |
| **Critic**   | Final script only       | Feedback analysis | Review notes     | Quality validation |

### Specialization Through Prompts:

Each agent's "personality" is defined by:

```
"You are [AGENT NAME] Agent.
Role: [SPECIFIC ROLE]
Input: [WHAT IT RECEIVES]
Task: [WHAT TO DO]"
```

Example - Research Agent's specialization:

```
"You are Research Agent.
Role: Research specialist
Input: {topic: "AI Trends"}
Task: Return facts and trends."
```

This simple prompt tells Gemini to:

- Act as a **research expert**
- Focus on **facts and trends**
- Return **information-focused** output
- NOT write dialogue or create structure

---

## Summary

### The Big Picture:

Your agentic podcast system works like a **human creative team**:

1. **Researcher** gathers information
2. **Planner** organizes structure
3. **Writer** produces content
4. **Editor** refines quality
5. **Critic** provides feedback

### Key Insights:

- **Sequential Flow**: Each agent waits for previous output
- **Prompt-Based Specialization**: Different prompts make agents different
- **Data Accumulation**: Later agents have full context
- **Single API**: Gemini API powers all agents
- **Orchestrated Execution**: runCrew.js controls the entire pipeline
- **File Persistence**: Final output saved automatically

### Execution Time: ~30-60 seconds for entire pipeline (depending on Gemini API response times)

---

**Generated**: Server Architecture Analysis Document
**Last Updated**: 2025
