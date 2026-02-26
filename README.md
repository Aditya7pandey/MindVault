<div align="center">

<br />

```
███╗   ███╗██╗███╗   ██╗██████╗ ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗
████╗ ████║██║████╗  ██║██╔══██╗██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝
██╔████╔██║██║██╔██╗ ██║██║  ██║██║   ██║███████║██║   ██║██║     ██║
██║╚██╔╝██║██║██║╚██╗██║██║  ██║╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║
██║ ╚═╝ ██║██║██║ ╚████║██████╔╝ ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║
╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝   ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝
```

### 🧠 Your AI-Powered Second Brain for the Web

*Stop losing links. Start finding knowledge — instantly, intelligently.*

<br />

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br />

[![GitHub stars](https://img.shields.io/github/stars/Aditya7pandey/MindVault?style=flat-square&color=6366f1)](https://github.com/Aditya7pandey/MindVault/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Aditya7pandey/MindVault?style=flat-square&color=6366f1)](https://github.com/Aditya7pandey/MindVault/forks)
[![GitHub issues](https://img.shields.io/github/issues/Aditya7pandey/MindVault?style=flat-square)](https://github.com/Aditya7pandey/MindVault/issues)

<br />

[🚀 Live Demo](#) &nbsp;·&nbsp; [📖 Documentation](#) &nbsp;·&nbsp; [🐛 Report Bug](https://github.com/Aditya7pandey/MindVault/issues) &nbsp;·&nbsp; [✨ Request Feature](https://github.com/Aditya7pandey/MindVault/issues)

<br />

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [The Problem](#-the-problem)
- [How It Works](#-how-it-works)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🧠 About the Project

**MindVault** is a full-stack, AI-powered bookmarking system that functions as your digital second brain. Unlike traditional bookmark managers that rely on rigid folder structures and keyword matching, MindVault *understands* your saved content using sentence-level vector embeddings — so you can find anything with a simple, natural language query.

> **"That React animation library I saved last month"** → Found in milliseconds.
>
> **"Show me that article about async Python patterns"** → Found, even if you saved it months ago.

---

## 🚨 The Problem

Every developer, researcher, and knowledge worker faces the same fate:

- ❌ Hundreds of saved links — articles, tools, docs, design assets
- ❌ Traditional bookmarks sorted by folders you forget exist
- ❌ Keyword search fails when you can't recall the exact title
- ❌ Cognitive overload managing a library that keeps growing

**MindVault eliminates this** by using AI embeddings to capture the *meaning* of every link you save, enabling retrieval by intent — not memory.

---

## ⚙️ How It Works

```
  User saves a URL
        │
        ▼
  Express API receives it
        │
        ▼
  Forwards to Python AI Service
        │
        ▼
  sentence-transformers generates
  a 384-dimensional vector embedding
  representing the semantic meaning
        │
        ▼
  Embedding stored in MongoDB
  alongside URL + metadata
        │
  ──────────────────────────────

  User types a natural language query
        │
        ▼
  Query is embedded into a vector
        │
        ▼
  Cosine similarity search runs
  across all stored embeddings
        │
        ▼
  Top-matching links returned
  ranked by semantic relevance
```

---

## ✨ Features

### Core
| Feature | Details |
|---|---|
| 🔍 **Semantic Search** | Retrieve links using natural language — meaning-based, not keyword-based |
| 🤖 **AI Embeddings** | `all-MiniLM-L6-v2` generates compact 384-dim vectors per saved link |
| ⚡ **Vector Similarity** | Cosine similarity ranking for high-accuracy retrieval |
| 💾 **Persistent Storage** | MongoDB stores URLs, metadata, and their vector embeddings |

### Developer Experience
| Feature | Details |
|---|---|
| 🔒 **End-to-End Type Safety** | TypeScript + Zod schema validation across the entire Node.js layer |
| 🧩 **Modular Services** | Three decoupled services: Frontend, Express API, FastAPI AI Engine |
| 📬 **Email Notifications** | Nodemailer integration for secure transactional email |
| 🔄 **Hot Reload** | All three services support hot-reload during development |

### UI/UX
| Feature | Details |
|---|---|
| 🎨 **Modern Dashboard** | Built with Shadcn/UI components for a clean, accessible interface |
| 💫 **Smooth Animations** | Framer Motion powers fluid transitions and micro-interactions |
| 📱 **Fully Responsive** | Mobile-first design using Tailwind CSS utility classes |
| 🗂️ **Global State** | Zustand provides lightweight, reactive state management |

---

## 🏗️ Architecture

MindVault is a **tri-service** application where each service has a single, clear responsibility:

```
┌──────────────────────────────────────────────────────────────────┐
│                           BROWSER                                │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │               React Frontend (Vite)                      │   │
│   │   Tailwind · Shadcn/UI · Framer Motion · Zustand         │   │
│   └─────────────────────────┬────────────────────────────────┘   │
└─────────────────────────────│────────────────────────────────────┘
                              │ REST (HTTP/JSON)
                              │ :5173 → :3000
┌─────────────────────────────▼────────────────────────────────────┐
│                      Express API (Node.js)                       │
│                 TypeScript · Zod · Nodemailer                    │
│                                                                  │
│  Routes: /api/links   /api/search   /api/auth   /api/email       │
└─────────────────────────────┬────────────────────────────────────┘
                              │ Internal REST
                              │ :3000 → :8000
┌─────────────────────────────▼────────────────────────────────────┐
│                   Python AI Engine (FastAPI)                     │
│            sentence-transformers · all-MiniLM-L6-v2              │
│                                                                  │
│   POST /embed    → Generate embedding for a URL / text           │
│     │
└─────────────────────────────┬────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                         MongoDB                                  │
│          Collections: users · links · embeddings                 │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### 🖥️ Frontend

| Technology | Purpose |
|---|---|
| [React 18](https://reactjs.org/) | UI component framework |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Shadcn/UI](https://ui.shadcn.com/) | Accessible, composable component library |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight global state management |
| [Vite](https://vitejs.dev/) | Build tool & dev server |

### 🔧 Backend (Node.js)

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Express](https://expressjs.com/) | HTTP server & routing |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Zod](https://zod.dev/) | Runtime schema validation |
| [Mongoose](https://mongoosejs.com/) | MongoDB object modeling |
| [Nodemailer](https://nodemailer.com/) | Transactional email |

### 🤖 AI / Vector Engine (Python)

| Technology | Purpose |
|---|---|
| [Python 3.9+](https://python.org/) | Language |
| [FastAPI](https://fastapi.tiangolo.com/) | High-performance async API framework |
| [sentence-transformers](https://www.sbert.net/) | Embedding model framework |
| `all-MiniLM-L6-v2` | 384-dimensional semantic embedding model |
| [Uvicorn](https://www.uvicorn.org/) | ASGI production server |
| [Pydantic](https://docs.pydantic.dev/) | Data validation for AI service |

### 🗄️ Database

| Technology | Purpose |
|---|---|
| [MongoDB](https://www.mongodb.com/) | Primary database — users, links, embeddings |
| [MongoDB Atlas](https://cloud.mongodb.com/) | Recommended cloud-hosted deployment |

---

## 📁 Project Structure

```
MindVault/
│
├── 📂 frontend/                      # React + Vite Application
│   ├── public/
│   └── src/
│       ├── components/               # Reusable UI components
│       │   ├── ui/                   # Shadcn base components
│       │   ├── LinkCard.tsx          # Individual saved link card
│       │   ├── SearchBar.tsx         # Semantic search input
│       │   └── Navbar.tsx
│       ├── pages/                    # Route-level page components
│       │   ├── Dashboard.tsx         # Main vault view
│       │   ├── Login.tsx
│       │   └── Register.tsx
│       ├── store/                    # Zustand state management
│       │   ├── useAuthStore.ts
│       │   └── useLinkStore.ts
│       ├── lib/                      # API clients, utilities
│       ├── types/                    # Shared TypeScript interfaces
│       ├── App.tsx
│       └── main.tsx
│
├── 📂 backend/                       # Node.js + Express API
│   └── src/
│       ├── routes/                   # Express route definitions
│       │   ├── links.ts
│       │   ├── auth.ts
│       │   └── email.ts
│       ├── controllers/              # Request handler logic
│       ├── models/                   # Mongoose schemas
│       │   ├── User.ts
│       │   └── Link.ts
│       ├── middleware/               # Auth, error handling
│       ├── services/
│       │   └── vectorService.ts      # Bridge to Python AI engine
│       ├── validators/               # Zod schemas
│       └── index.ts                  # App entry point
│
├── 📂 python_backend/                # FastAPI AI Service
│   ├── main.py                       # FastAPI app entry point
│   ├── routes/
│   │   ├── embed.py                  # POST /embed
│   │   └── search.py                 # POST /search
│   ├── services/
│   │   └── embedder.py               # sentence-transformers logic
│   ├── models/
│   │   └── schemas.py                # Pydantic request/response models
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Minimum Version | Install |
|---|---|---|
| Node.js | `v18.0` | [nodejs.org](https://nodejs.org/) |
| npm | `v9.0` | Bundled with Node.js |
| Python | `3.9` | [python.org](https://www.python.org/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| MongoDB | Local or Atlas | [mongodb.com](https://www.mongodb.com/) |

---

### Installation

#### Step 1 — Clone the Repository

```bash
git clone https://github.com/Aditya7pandey/MindVault.git
cd MindVault
```

---

#### Step 2 — 🤖 Python AI Service

```bash
cd python_backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# Windows (CMD / PowerShell)
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the AI service
uvicorn main:app --reload --port 8000
```

#### Step 3 — 🔧 Express Backend

```bash
# From the project root
cd backend

npm install

# Configure your environment variables
cp .env.example .env
# → Edit .env with your MongoDB URL, JWT secret, and email credentials

npm run dev
```

> ✅ API server running at **`http://localhost:3000`**

---

#### Step 4 — 🖥️ Frontend

```bash
# From the project root
cd frontend

npm install
npm run dev
```

> ✅ App running at **`http://localhost:5173`**

---

### Run All Three Services

Open three terminals and run each simultaneously:

```bash
# Terminal 1 — AI Engine
cd python_backend && source .venv/bin/activate && uvicorn main:app --reload

# Terminal 2 — Express API
cd backend && npm run dev

# Terminal 3 — React Frontend
cd frontend && npm run dev
```

---

## 🔐 Environment Variables

### `backend/.env`

```env
# ── Server ─────────────────────────────────────
PORT=3000
# ── Database ───────────────────────────────────
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mindvault

# ── Authentication ─────────────────────────────
JWT_SECRET=your_super_secret_jwt_key

# ── Email (Nodemailer) ─────────────────────────
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# ── Python AI Service ──────────────────────────
GEMINI_API_KEY=your_gemini_key
```

### `python_backend/.env`

```env
HOST=0.0.0.0
PORT=8000
MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
```

> ⚠️ **Never commit `.env` files.** They are covered by `.gitignore`.

---

## 📡 API Reference

### Express API — `http://localhost:5000`

#### Auth Routes

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Create a new account | ❌ |
| `POST` | `/api/auth/login` | Login and get JWT | ❌ |
| `POST` | `/api/auth/logout` | Invalidate session | ✅ |

#### Link Routes

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/links` | Fetch all saved links | ✅ |
| `POST` | `/api/links` | Save a new link | ✅ |
| `DELETE` | `/api/links/:id` | Delete a link | ✅ |
| `POST` | `/api/links/search` | Semantic search | ✅ |

#### Example — Save a Link

```json
POST /api/links
Authorization: Bearer <token>

{
  "url": "https://www.framer.com/motion/",
  "title": "Framer Motion Documentation",
  "description": "Production-ready animation library for React"
}
```

#### Example — Semantic Search

```json
POST /api/links/search
Authorization: Bearer <token>

{
  "query": "React animation library"
}

// Response
{
  "results": [
    {
      "_id": "64b8f3...",
      "url": "https://www.framer.com/motion/",
      "title": "Framer Motion Documentation",
      "similarity": 0.94
    }
  ]
}
```

---

### Python AI Engine — `http://localhost:8000`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/embed` | Generate a vector embedding |

---

## 🖼️ Usage

### Saving a Link

1. Paste any URL into the input field on your dashboard
2. MindVault auto-fetches the page title and description
3. The Python AI service embeds the content semantically
4. The link is stored in your personal vault with its vector

### Searching Your Vault

1. Type any natural language query in the search bar
2. Examples: *"that CSS grid layout guide"* / *"Python async best practices"* / *"design system article"*
3. MindVault runs cosine similarity search across all your embeddings
4. Results rank by semantic closeness — not exact keyword match

---

## 🤝 Contributing

Contributions make open source thrive — any contribution is **greatly appreciated**! 🙌

### Commit Convention

| Prefix | Use For |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructuring |
| `test:` | Adding or fixing tests |
| `chore:` | Build/config changes |

---

## 🙏 Acknowledgments

- Inspired by the **[Build in Public](https://twitter.com/search?q=buildinpublic)** community
- [Sentence Transformers](https://www.sbert.net/) — `all-MiniLM-L6-v2` embedding model
- [Shadcn/UI](https://ui.shadcn.com/) — Accessible component design system
- [Framer Motion](https://www.framer.com/motion/) — Production-ready animation library
- [FastAPI](https://fastapi.tiangolo.com/) — Modern Python web framework
- [Zustand](https://github.com/pmndrs/zustand) — Minimalist state management

---

<div align="center">

<br />

Built with ❤️ by **[Aditya Pandey](https://github.com/Aditya7pandey)**

<br />

⭐ **If MindVault helped you, give it a star!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/Aditya7pandey/MindVault?style=social)](https://github.com/Aditya7pandey/MindVault)

</div>
