# Agentic Podcast System - Visual Flowcharts & Diagrams

## 1. Complete System Architecture Flowchart

```mermaid
graph TD
    A["🖥️ CLIENT REQUEST<br/>POST /api/podcast/generate<br/>Body: {topic: 'AI Trends'}"] -->|HTTP| B["📦 EXPRESS SERVER<br/>src/server.js<br/>Port: 5000"]

    B -->|Route Match| C["🛣️ ROUTES<br/>src/routes/podcast.routes.js<br/>Matches /api/podcast/generate"]

    C -->|Call Handler| D["⚙️ CONTROLLER<br/>src/controllers/podcast.controller.js<br/>generatePodcast()"]

    D -->|Execute| E["🎭 ORCHESTRATOR<br/>src/orchestrator/runCrew.js<br/>Coordinates 5 agents<br/>Manages memory object"]

    E -->|1️⃣ Research| F["🔍 RESEARCH AGENT<br/>Analyzes topic<br/>Gathers facts & trends<br/>Creates knowledge base"]

    F -->|Output + Topic| G["📋 PLANNER AGENT<br/>Creates episode outline<br/>Plans structure & flow<br/>Designs segments"]

    G -->|Output + All Previous| H["✍️ WRITER AGENT<br/>Writes host dialogue<br/>Creates full script<br/>Adds conversational tone"]

    H -->|Output| I["✂️ EDITOR AGENT<br/>Improves script quality<br/>Fixes grammar & flow<br/>Polishes content"]

    I -->|Output| J["🎯 CRITIC AGENT<br/>Reviews for weaknesses<br/>Provides QA feedback<br/>Final quality check"]

    J -->|Final Output| K["💾 FILE SYSTEM<br/>Saves to outputs/<br/>podcast-[timestamp].md"]

    K -->|Return| L["📤 JSON RESPONSE<br/>topic, file, logs,<br/>research, outline,<br/>review, script"]

    L -->|HTTP 200| M["👤 CLIENT<br/>Receives podcast script<br/>Ready to publish"]

    style A fill:#e1f5ff
    style B fill:#fff3e0
    style C fill:#fff3e0
    style D fill:#f3e5f5
    style E fill:#e8f5e9
    style F fill:#fff9c4
    style G fill:#f0f4c3
    style H fill:#e0f2f1
    style I fill:#fce4ec
    style J fill:#f1f8e9
    style K fill:#eeeeee
    style L fill:#ffccbc
    style M fill:#c8e6c9
```

---

## 2. Agent Specialization & Data Flow

```mermaid
graph LR
    INPUT["📥 INPUT<br/>topic:<br/>AI Trends"]

    subgraph RESEARCH ["Research Agent 🔍"]
        R["Prompt:<br/>Return facts and trends<br/><br/>Role: Research Specialist"]
        R1["Output:<br/>- Latest breakthroughs<br/>- Market trends<br/>- Industry players<br/>- Regulations<br/>- Security concerns"]
    end

    subgraph PLANNER ["Planner Agent 📋"]
        P["Prompt:<br/>Create outline<br/>+ research data<br/><br/>Role: Planner Specialist"]
        P1["Output:<br/>- Opening hook<br/>- Intro section<br/>- Key points (3-5)<br/>- Discussion<br/>- CTA & closing"]
    end

    subgraph WRITER ["Writer Agent ✍️"]
        W["Prompt:<br/>Write two host script<br/>+ outline + research<br/><br/>Role: Writer Specialist"]
        W1["Output:<br/>HOST 1: ...<br/>HOST 2: ...<br/><br/>Full dialogue"]
    end

    subgraph EDITOR ["Editor Agent ✂️"]
        E["Prompt:<br/>Improve script<br/>+ draft only<br/><br/>Role: Editor Specialist"]
        E1["Output:<br/>- Better grammar<br/>- Smoother flow<br/>- Professional tone<br/>- Polished quality"]
    end

    subgraph CRITIC ["Critic Agent 🎯"]
        C["Prompt:<br/>Review weaknesses<br/>+ final script<br/><br/>Role: QA Specialist"]
        C1["Output:<br/>- Strengths noted<br/>- Weaknesses found<br/>- Improvement areas<br/>- Recommendations"]
    end

    OUTPUT["📤 OUTPUT<br/>Final podcast script<br/>saved + returned"]

    INPUT --> RESEARCH
    RESEARCH --> R1
    R1 --> PLANNER
    PLANNER --> P1
    P1 --> WRITER
    WRITER --> W1
    W1 --> EDITOR
    EDITOR --> E1
    E1 --> CRITIC
    CRITIC --> C1
    C1 --> OUTPUT

    style INPUT fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style RESEARCH fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style PLANNER fill:#f0f4c3,stroke:#9ccc65,stroke-width:2px
    style WRITER fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style EDITOR fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style CRITIC fill:#f1f8e9,stroke:#558b2f,stroke-width:2px
    style OUTPUT fill:#ffccbc,stroke:#d84315,stroke-width:2px
```

---

## 3. Server Startup Sequence

```mermaid
sequenceDiagram
    participant Terminal
    participant Node as Node Runtime
    participant Server as server.js
    participant Express as Express
    participant Routes as podcast.routes.js
    participant Port as Port 5000

    Terminal->>Node: npm start
    Node->>Server: Load src/server.js
    activate Server

    Server->>Server: require("express")
    Server->>Server: require("dotenv").config()

    Server->>Express: const app = express()
    activate Express

    Server->>Express: app.use(express.json())
    Note over Express: JSON middleware loaded

    Server->>Routes: app.use("/api/podcast", routes)
    Routes-->>Server: Routes registered

    Server->>Port: app.listen(5000, callback)
    activate Port

    Port-->>Server: Listening on port 5000
    Server-->>Terminal: console.log("running")

    Note over Server,Port: Server ready to accept requests
    Terminal->>Terminal: Server startup complete ✓
```

---

## 4. Request Handling Flow

```mermaid
sequenceDiagram
    participant Client
    participant Express as Express Routes
    participant Controller as Podcast Controller
    participant Orchestrator as Orchestrator (runCrew)
    participant Agents as AI Agents
    participant Gemini as Gemini API
    participant FileSystem as File System

    Client->>Express: POST /api/podcast/generate<br/>{topic: "AI Trends"}

    Express->>Controller: generatePodcast(req, res)
    Note over Controller: Extract topic from req.body

    Controller->>Orchestrator: runCrew("AI Trends")
    activate Orchestrator

    Orchestrator->>Agents: 1️⃣ research.run({topic})
    Agents->>Gemini: Send research prompt
    Gemini-->>Agents: Return facts
    Agents-->>Orchestrator: research data

    Orchestrator->>Agents: 2️⃣ planner.run({topic, research})
    Agents->>Gemini: Send planner prompt
    Gemini-->>Agents: Return outline
    Agents-->>Orchestrator: episode outline

    Orchestrator->>Agents: 3️⃣ writer.run({topic, outline, research})
    Agents->>Gemini: Send writer prompt
    Gemini-->>Agents: Return draft script
    Agents-->>Orchestrator: draft script

    Orchestrator->>Agents: 4️⃣ editor.run({draft})
    Agents->>Gemini: Send editor prompt
    Gemini-->>Agents: Return polished script
    Agents-->>Orchestrator: polished script

    Orchestrator->>Agents: 5️⃣ critic.run({script})
    Agents->>Gemini: Send critic prompt
    Gemini-->>Agents: Return feedback
    Agents-->>Orchestrator: review feedback

    Orchestrator->>FileSystem: Save to outputs/podcast-[timestamp].md
    FileSystem-->>Orchestrator: File saved

    Orchestrator-->>Controller: Return memory object
    deactivate Orchestrator

    Controller->>Client: res.json(result)<br/>Status: 200 OK
    Client->>Client: Display podcast script

    Note over Client: Podcast generation complete!
```

---

## 5. Memory Object Evolution

```mermaid
graph TD
    subgraph STEP1 ["Step 1: After Research Agent"]
        MEM1["
        memory = {
          topic: 'AI Trends',
          logs: ['research done'],
          research: '[facts & trends...]'
        }
        "]
    end

    subgraph STEP2 ["Step 2: After Planner Agent"]
        MEM2["
        memory = {
          topic: 'AI Trends',
          logs: ['research done', 'plan done'],
          research: '[facts & trends...]',
          plan: '[episode outline...]'
        }
        "]
    end

    subgraph STEP3 ["Step 3: After Writer Agent"]
        MEM3["
        memory = {
          topic: 'AI Trends',
          logs: [..., 'draft done'],
          research: '[...]',
          plan: '[...]',
          draft: '[HOST 1: ... HOST 2: ...]'
        }
        "]
    end

    subgraph STEP4 ["Step 4: After Editor Agent"]
        MEM4["
        memory = {
          topic: 'AI Trends',
          logs: [..., 'edit done'],
          research: '[...]',
          plan: '[...]',
          draft: '[...]',
          finalScript: '[improved script...]'
        }
        "]
    end

    subgraph STEP5 ["Step 5: After Critic Agent"]
        MEM5["
        memory = {
          topic: 'AI Trends',
          logs: [..., 'review done'],
          research: '[...]',
          plan: '[...]',
          draft: '[...]',
          finalScript: '[...]',
          review: '[QA feedback...]'
        }
        "]
    end

    STEP1 -->|Add plan| STEP2
    STEP2 -->|Add draft| STEP3
    STEP3 -->|Add finalScript| STEP4
    STEP4 -->|Add review| STEP5

    style STEP1 fill:#fff9c4
    style STEP2 fill:#f0f4c3
    style STEP3 fill:#e0f2f1
    style STEP4 fill:#fce4ec
    style STEP5 fill:#f1f8e9
```

---

## 6. Agent Role Comparison Matrix

```mermaid
graph TD
    subgraph Comparison["AGENT SPECIALIZATION MATRIX"]

        subgraph R["🔍 RESEARCH AGENT"]
            R1["Input: Topic Only<br/>Focus: Facts & Trends<br/>API Calls: 1x<br/>Processes: Raw Info<br/>Output Type: Factual Data"]
        end

        subgraph P["📋 PLANNER AGENT"]
            P1["Input: Topic + Research<br/>Focus: Structure<br/>API Calls: 1x<br/>Processes: Information Organization<br/>Output Type: Outline/Blueprint"]
        end

        subgraph W["✍️ WRITER AGENT"]
            W1["Input: All Previous Data<br/>Focus: Content Creation<br/>API Calls: 1x<br/>Processes: Dialogue Writing<br/>Output Type: Full Script"]
        end

        subgraph E["✂️ EDITOR AGENT"]
            E1["Input: Draft Script Only<br/>Focus: Quality & Polish<br/>API Calls: 1x<br/>Processes: Refinement<br/>Output Type: Polished Script"]
        end

        subgraph C["🎯 CRITIC AGENT"]
            C1["Input: Final Script Only<br/>Focus: QA & Feedback<br/>API Calls: 1x<br/>Processes: Validation<br/>Output Type: Review Notes"]
        end
    end

    style R fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style P fill:#f0f4c3,stroke:#9ccc65,stroke-width:2px
    style W fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style C fill:#f1f8e9,stroke:#558b2f,stroke-width:2px
```

---

## 7. Request Response Cycle

```mermaid
graph LR
    A["📱 CLIENT"] -->|POST Request<br/>Topic: AI Trends| B["SERVER<br/>Express App"]

    B -->|Parse JSON| C["Extract Input"]

    C -->|Call runCrew| D["Orchestrator<br/>Initialize Memory"]

    D -->|Execute Sequential<br/>5 Agent Pipeline| E["AI Processing<br/>30-60 seconds"]

    E -->|Assemble Response| F["Create JSON<br/>with all outputs"]

    F -->|Save File| G["outputs/<br/>podcast-[ts].md"]

    G -->|HTTP 200| H["Send Response"]

    H -->|Display Result| A

    style A fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style B fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style C fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style D fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    style E fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    style F fill:#e0f2f1,stroke:#004d40,stroke-width:2px
    style G fill:#eeeeee,stroke:#212121,stroke-width:2px
    style H fill:#ffccbc,stroke:#bf360c,stroke-width:2px
```

---

## 8. Technology Stack Architecture

```mermaid
graph TD
    subgraph CLIENT["CLIENT LAYER"]
        CL["Browser / API Client<br/>Makes HTTP requests"]
    end

    subgraph NETWORK["NETWORK LAYER"]
        NET["HTTP/REST Communication<br/>JSON data format"]
    end

    subgraph SERVER["SERVER LAYER"]
        SRV["Node.js Runtime<br/>JavaScript Execution"]
        EXP["Express.js<br/>Web Framework & Routing"]
    end

    subgraph APP["APPLICATION LAYER"]
        RT["Routes<br/>podcast.routes.js"]
        CT["Controller<br/>podcast.controller.js"]
        ORC["Orchestrator<br/>runCrew.js"]
        AG["Agents<br/>5 AI Agents"]
    end

    subgraph AI["AI SERVICE LAYER"]
        GEM["Gemini Service<br/>gemini.js"]
        API["Google Gemini API<br/>@google/generative-ai"]
    end

    subgraph STORAGE["STORAGE LAYER"]
        ENV["Environment<br/>.env / dotenv"]
        FS["File System<br/>outputs/ folder"]
    end

    subgraph CLOUD["CLOUD SERVICE"]
        GCP["Google Cloud<br/>Gemini Model"]
    end

    CLIENT --> NETWORK
    NETWORK --> SERVER
    SERVER --> EXP
    EXP --> APP
    RT --> CT
    CT --> ORC
    ORC --> AG
    AG --> GEM
    GEM --> API
    API --> GCP
    APP --> ENV
    APP --> FS

    style CLIENT fill:#e1f5ff
    style NETWORK fill:#bbdefb
    style SERVER fill:#fff3e0
    style APP fill:#f3e5f5
    style AI fill:#fce4ec
    style STORAGE fill:#eeeeee
    style CLOUD fill:#c8e6c9
```

---

## 9. Complete Execution Timeline

```mermaid
timeline
    title Podcast Generation Timeline

    T1: 0ms - Server Started
        : "Express listening on port 5000"

    T2: User Sends Request
        : "POST /api/podcast/generate"
        : "Body: {topic: 'AI Trends'}"

    T3: Route Processing
        : "Route matched"
        : "Controller called"

    T4: Research Phase
        : "0-5s: Gemini processes research prompt"
        : "Output: Facts and trends gathered"

    T5: Planner Phase
        : "5-10s: Gemini creates outline"
        : "Input: Research data + Topic"
        : "Output: Episode structure"

    T6: Writer Phase
        : "10-20s: Gemini writes script"
        : "Input: Outline + Research"
        : "Output: Full dialogue"

    T7: Editor Phase
        : "20-35s: Gemini polishes script"
        : "Input: Draft script"
        : "Output: Refined version"

    T8: Critic Phase
        : "35-50s: Gemini reviews content"
        : "Input: Final script"
        : "Output: QA feedback"

    T9: File Saved
        : "50-52s: Script written to outputs/"
        : "File: podcast-[timestamp].md"

    T10: Response Sent
        : "52-54s: JSON response compiled"
        : "HTTP 200 OK sent to client"

    T11: Complete
        : "✓ Podcast script ready"
        : "✓ All data returned"
```

---

## 10. Error Handling & Retry Logic

```mermaid
graph TD
    A["API Request Received"] -->|Success| B["Process Normally"]
    A -->|Error| C["Catch Error"]

    B --> D["Execute Each Agent"]
    D -->|Agent Success| E["Continue to Next"]
    D -->|Agent Error| F["Catch Error in runCrew"]

    E -->|All Complete| G["Save File"]
    E -->|Final Step| H["Return Response"]

    F -->|Gemini Timeout| I["Return Error Message"]
    F -->|Invalid Response| J["Return Error Message"]
    F -->|Network Error| K["Return Error Message"]

    C -->|Catch Block| L["res.status 500<br/>{ error: message }"]
    I --> L
    J --> L
    K --> L

    G --> H
    H --> M["Client Receives<br/>Full Data"]
    L --> N["Client Receives<br/>Error Object"]

    style A fill:#e1f5ff
    style B fill:#c8e6c9
    style C fill:#ffccbc
    style M fill:#c8e6c9
    style N fill:#ffcdd2
```

---

## Key Insights Summary

### 🎯 How They Work Differently:

1. **Research Agent**: Depth → Breadth (goes deep on facts)
2. **Planner Agent**: Structure → Organization (organizes information)
3. **Writer Agent**: Creation → Dialogue (creates new content)
4. **Editor Agent**: Refinement → Polish (improves existing)
5. **Critic Agent**: Validation → Feedback (checks quality)

### 🔗 How They're Connected:

- **Sequential Pipeline**: Each waits for previous
- **Data Inheritance**: Later agents have all previous data
- **Prompt-Based**: Different prompts = Different behaviors
- **Single API**: All use Gemini API
- **Memory Object**: Orchestrator maintains context

### ⚡ Execution Pattern:

```
Linear Sequential Flow (NOT parallel)
│
├─ Agent 1 (5-10s)
├─ Agent 2 (5-10s)
├─ Agent 3 (10-15s)
├─ Agent 4 (10-15s)
├─ Agent 5 (10-15s)
│
└─ Total: 40-65 seconds
```

---

**Document Generated**: Visual Architecture & Flowcharts
**All diagrams rendered with Mermaid.js**
