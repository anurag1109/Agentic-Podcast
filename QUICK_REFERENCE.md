# AGENTIC PODCAST SYSTEM - QUICK REFERENCE GUIDE

## 🚀 Quick Start: What Happens When You Start the Server

```bash
npm start
```

**Timeline**:

1. ✅ Node.js starts
2. ✅ Express server initialized
3. ✅ Environment variables loaded (.env)
4. ✅ Routes registered
5. ✅ Server listening on port 5000
6. ✅ Ready to accept requests (30-50ms)

---

## 📋 API Endpoint Reference

### Generate Podcast

**Endpoint**: `POST /api/podcast/generate`

**Request**:

```json
{
  "topic": "Your Podcast Topic"
}
```

**Response**:

```json
{
  "topic": "Your Podcast Topic",
  "file": "outputs/podcast-1713700234567.md",
  "logs": [
    "research done",
    "plan done",
    "draft done",
    "edit done",
    "review done"
  ],
  "research": "[research facts...]",
  "outline": "[episode outline...]",
  "review": "[QA feedback...]",
  "script": "[final podcast script...]"
}
```

**Response Time**: 40-65 seconds

---

## 🧠 The 5 Agents Explained in One Sentence Each

| Agent           | Role              | Input                      | Output          |
| --------------- | ----------------- | -------------------------- | --------------- |
| **🔍 Research** | Gathers facts     | Topic                      | Research data   |
| **📋 Planner**  | Creates structure | Topic + Research           | Episode outline |
| **✍️ Writer**   | Writes dialogue   | Topic + Outline + Research | Draft script    |
| **✂️ Editor**   | Polishes writing  | Draft script               | Refined script  |
| **🎯 Critic**   | Reviews quality   | Final script               | QA feedback     |

---

## 🔄 Data Flow (What Data Flows Where)

### Step 1: Research Agent

```
INPUT: { topic: "AI Trends" }
PROCESS: Ask Gemini for facts
OUTPUT: "Market trends include... major players are... regulatory..."
STORED: memory.research
```

### Step 2: Planner Agent

```
INPUT: { topic, research }
PROCESS: Create structure based on facts
OUTPUT: "1. Opening... 2. Key Points... 3. Discussion..."
STORED: memory.plan
```

### Step 3: Writer Agent

```
INPUT: { topic, outline, research }
PROCESS: Write dialogue combining all info
OUTPUT: "HOST 1: Welcome!\nHOST 2: Today we..."
STORED: memory.draft
```

### Step 4: Editor Agent

```
INPUT: { draft }
PROCESS: Improve grammar, flow, tone
OUTPUT: "[improved script with better quality]"
STORED: memory.finalScript
```

### Step 5: Critic Agent

```
INPUT: { script }
PROCESS: Review and provide feedback
OUTPUT: "Strengths: ... Improvements: ..."
STORED: memory.review
```

---

## ⚙️ System Architecture (Layers)

```
Layer 1: CLIENT (Browser/API Client)
   ↓
Layer 2: HTTP/REST (Express Server)
   ↓
Layer 3: ROUTES & CONTROLLER (Endpoint handling)
   ↓
Layer 4: ORCHESTRATOR (runCrew - Controls agent pipeline)
   ↓
Layer 5: AGENTS (5 specialized AI agents)
   ↓
Layer 6: GEMINI SERVICE (API wrapper)
   ↓
Layer 7: GOOGLE CLOUD (Actual AI model)
```

---

## 🎯 Key Characteristics of Each Agent

### RESEARCH AGENT 🔍

- **Personality**: Factual, analytical
- **Focus**: Accuracy, trends, depth
- **Processes**: Raw topic
- **Output Quality**: Factual reliability
- **Time**: 5-10 seconds
- **Example Field**: Researcher gathering sources

### PLANNER AGENT 📋

- **Personality**: Organizational, structured
- **Focus**: Flow, segments, coherence
- **Processes**: Facts into structure
- **Output Quality**: Logical organization
- **Time**: 5-10 seconds
- **Example Field**: Project manager creating outline

### WRITER AGENT ✍️

- **Personality**: Creative, conversational
- **Focus**: Engagement, dialogue, narrative
- **Processes**: Structure into content
- **Output Quality**: Natural readability
- **Time**: 10-15 seconds
- **Example Field**: Screenwriter creating script

### EDITOR AGENT ✂️

- **Personality**: Critical, perfectionist
- **Focus**: Quality, polish, refinement
- **Processes**: Raw content into production-ready
- **Output Quality**: Professional standard
- **Time**: 10-15 seconds
- **Example Field**: Copyeditor improving writing

### CRITIC AGENT 🎯

- **Personality**: Analytical, constructive
- **Focus**: Gaps, improvements, validation
- **Processes**: Final content through QA lens
- **Output Quality**: Feedback accuracy
- **Time**: 10-15 seconds
- **Example Field**: QA tester finding issues

---

## 💡 Why They Work Differently

### Prompt Engineering

Each agent has a different **system prompt** that tells Gemini how to behave:

```javascript
Research Agent:
"You are Research Agent. Role: Research specialist"
↓ Tells Gemini to act as researcher

Planner Agent:
"You are Planner Agent. Role: Planner specialist"
↓ Tells Gemini to act as planner

Writer Agent:
"You are Writer Agent. Role: Writer specialist"
↓ Tells Gemini to act as writer

... and so on
```

### All Use Same Gemini Model

- **ALL agents** use the same Google Gemini API
- **Difference**: Input data + Prompt specialization
- **Result**: Different outputs from same AI

---

## 📊 Memory Object Growth

**Stage 1** (After Research Agent):

```javascript
{
  topic: "AI Trends",
  logs: ["research done"],
  research: "[facts]"
}
// Size: ~2-5 KB
```

**Stage 2** (After Planner Agent):

```javascript
{
  ...(all above),
  plan: "[outline]"
}
// Size: ~3-8 KB
```

**Stage 3** (After Writer Agent):

```javascript
{
  ...(all above),
  draft: "[full script]"
}
// Size: ~10-20 KB
```

**Stage 4** (After Editor Agent):

```javascript
{
  ...(all above),
  finalScript: "[polished script]"
}
// Size: ~10-20 KB (similar, just improved)
```

**Stage 5** (After Critic Agent):

```javascript
{
  ...(all above),
  review: "[feedback]"
}
// Size: ~12-25 KB (complete)
```

---

## 🔌 Connection Points Between Agents

### How agents "communicate":

```
Agent 1 Output  →  Orchestrator Memory  →  Agent 2 Input
    ❌ No direct communication
    ✓ All data flows through orchestrator
    ✓ Sequential (one waits for previous)
    ✓ Each agent independent & stateless
```

### Agent Dependencies:

```
Research Agent:     Independent (only takes topic)
   ↓
Planner Agent:      Depends on Research output
   ↓
Writer Agent:       Depends on Research + Planner
   ↓
Editor Agent:       Depends on Writer output
   ↓
Critic Agent:       Depends on Editor output
```

### No Circular Dependencies:

- Cannot go backwards
- Cannot request data from future agents
- Simple linear pipeline

---

## 🌍 Real-World Analogy

Think of it like a **human creative team**:

```
1. RESEARCHER:
   "Here's what I found about AI Trends"

2. PLANNER:
   "I'll organize this into 5 segments"

3. WRITER:
   "I'll write it as a conversation"

4. EDITOR:
   "I'm improving the language"

5. CRITIC:
   "Great job! Just add more depth to section 2"
```

Each person:

- ✅ Does their specific job
- ✅ Uses output from previous person
- ✅ Doesn't know about future improvements
- ✅ Focuses only on their expertise

---

## 🎬 Complete Request Example

**USER** sends:

```bash
curl -X POST http://localhost:5000/api/podcast/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Machine Learning 2025"}'
```

**SERVER PROCESSES** (40-65 seconds):

```
0s    → Receives request
2s    → Gemini researching ML trends
12s   → Planner creating episode outline
15s   → Writer creating host dialogue
30s   → Editor polishing the script
45s   → Critic reviewing final version
50s   → File saved to outputs/podcast-[ts].md
52s   → Response sent to client
```

**CLIENT RECEIVES**:

```json
{
  "topic": "Machine Learning 2025",
  "file": "outputs/podcast-1713700234567.md",
  "logs": [
    "research done",
    "plan done",
    "draft done",
    "edit done",
    "review done"
  ],
  "research": "[detailed ML research]",
  "outline": "[episode structure]",
  "review": "[QA feedback]",
  "script": "[complete podcast script ready to publish]"
}
```

---

## 📱 Where Each File Lives & Its Purpose

```
src/
├── server.js                    ← Server starts here (Port 5000)
├── routes/
│   └── podcast.routes.js       ← HTTP endpoint definitions
├── controllers/
│   └── podcast.controller.js   ← Request handler
├── orchestrator/
│   └── runCrew.js              ← Agent orchestration (THE BRAIN)
├── agents/
│   ├── researchAgent.js        ← Finds information
│   ├── plannerAgent.js         ← Organizes structure
│   ├── writerAgent.js          ← Writes content
│   ├── editorAgent.js          ← Improves quality
│   └── criticAgent.js          ← Provides feedback
└── services/
    └── gemini.js               ← Gemini API wrapper

outputs/
└── podcast-[timestamp].md      ← Final saved podcast script
```

---

## 🔑 Key Insights

### 1. Sequential Pipeline

- Agents run ONE AT A TIME
- Not parallel (A must finish before B starts)
- Each waits for previous agent's output

### 2. Specialization via Prompt

- Same AI (Gemini)
- Different prompts = Different behaviors
- Like changing an AI's job description

### 3. Memory Persistence

- Orchestrator maintains state
- Passes accumulated data to next agent
- Each agent gets more context than previous

### 4. Independent Agents

- Agents don't know about each other
- Each is a simple function with input/output
- Easy to modify or replace individual agents

### 5. Single Model, Many Roles

- Only 1 Gemini API model used
- 5 agents = 5 specialized prompts
- Efficient resource usage

---

## 🚨 Error Handling

If something fails:

```javascript
try {
  // Run orchestrator
  res.json(await runCrew(req.body.topic));
} catch (e) {
  // If ANY agent fails, returns error
  res.status(500).json({ error: e.message });
}
```

**Possible Errors**:

- Gemini API timeout
- Network error
- Invalid API key
- Agent processing failure

**Response**: HTTP 500 with error message

---

## 📈 Performance Metrics

| Metric          | Value             |
| --------------- | ----------------- |
| Research Agent  | 5-10 seconds      |
| Planner Agent   | 5-10 seconds      |
| Writer Agent    | 10-15 seconds     |
| Editor Agent    | 10-15 seconds     |
| Critic Agent    | 10-15 seconds     |
| **TOTAL**       | **40-65 seconds** |
| File Write      | <1 second         |
| Response Send   | <1 second         |
| **GRAND TOTAL** | **40-65 seconds** |

---

## 🎓 Learning Path

To understand this system, read in this order:

1. **Start here**: This file (QUICK_REFERENCE.md) ← You are here
2. **Architecture**: [SERVER_ARCHITECTURE_GUIDE.md](SERVER_ARCHITECTURE_GUIDE.md)
3. **Flowcharts**: [VISUAL_FLOWCHARTS.md](VISUAL_FLOWCHARTS.md)
4. **Deep dive**: [DETAILED_CODE_WALKTHROUGH.md](DETAILED_CODE_WALKTHROUGH.md)
5. **Source code**: Read the actual files (`src/**/*.js`)

---

## 🎯 TL;DR (The One-Page Summary)

**What it does**: Takes a topic → Generates a podcast script using 5 specialized AI agents

**How it works**:

1. Research agent gathers facts
2. Planner agent structures content
3. Writer agent creates dialogue
4. Editor agent polishes quality
5. Critic agent provides feedback

**Time needed**: 40-65 seconds

**Why each agent is different**: Different prompts tell the same Gemini model to act as different specialists

**How they're connected**: Sequential pipeline through orchestrator's memory object

**Output**: Podcast script file + All agent outputs returned to client

---

**Document**: Quick Reference Guide
**Next**: Open `SERVER_ARCHITECTURE_GUIDE.md` or `VISUAL_FLOWCHARTS.md` for detailed explanations
