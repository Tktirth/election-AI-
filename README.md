# 🗳️ Election Navigator AI

> Your intelligent, personalized guide to the democratic process.

![Election Navigator AI Hero](https://via.placeholder.com/1200x600/0a0a0a/ffffff?text=Election+Navigator+AI)

Election Navigator AI is a premium SaaS-level application designed to simplify the complex election process. It provides users with a personalized, step-by-step roadmap from registration to casting their ballot.

---

## 🎯 Problem Statement
Voting in India can be complex. Registration deadlines, booth locations, and EPIC (Voter ID) requirements can be overwhelming given the scale of the democratic process. This can lead to voter apathy. People need a clear, actionable, and personalized guide.

## 💡 Solution Overview
Election Navigator AI acts as a personal voting concierge for Indian citizens. By answering simple questions, users receive a highly personalized **Election Readiness Score**, a dynamic checklist (NVSP registration, EPIC verification), and an AI assistant ready to explain complex processes in simple terms.

---

## ✨ Key Features

- **🧠 Smart Onboarding Flow**: Instantly tailors the experience based on age, state, and registration status.
- **🎯 Election Readiness Score**: A gamified 0–100 score that updates in real-time as users complete their personalized checklist.
- **📋 Dynamic Checklist & Timeline**: Interactive tracking of registration windows, EPIC verification, and Polling Day.
- **🤖 Context-Aware AI Assistant**: A chat interface that understands the Indian electoral context (NVSP, Booth Level Officers, etc.).
- **✨ "Explain Like I'm 15" Mode**: A toggle that instantly simplifies complex political jargon into easily digestible concepts.
- **💎 Premium UI/UX**: Built with a stunning Glassmorphism/Neumorphism hybrid design, smooth Framer Motion animations, and deep dark mode aesthetics.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend Architecture
- **Server**: Node.js + Express
- **Language**: TypeScript
- **Database**: PostgreSQL (Prisma/Sequelize ready)
- **Caching**: Redis
- **AI Integration**: Prepared for Gemini / OpenAI APIs

---

## 🏗️ Architecture Overview

The project is structured into two main components:
1. **`/frontend`**: A highly interactive Next.js application that handles state, animations, and the AI chat interface.
2. **`/backend`**: A modular Node.js/Express service containing the business logic for generating timelines, calculating readiness scores, and communicating with the AI models.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/election-navigator-ai.git
cd election-navigator-ai
\`\`\`

### 2. Frontend Setup
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
The frontend will be running at \`http://localhost:3000\`.

### 3. Backend Setup
\`\`\`bash
cd ../backend
npm install
npm run dev
\`\`\`
The backend will be running at \`http://localhost:5000\`.

---

## 🔑 Environment Variables

Create a \`.env\` file in the backend directory:

\`\`\`env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/election_db
REDIS_URL=redis://localhost:6379
AI_API_KEY=your_gemini_or_openai_api_key
\`\`\`

---

## 📡 API Documentation

| Endpoint | Method | Description |
|----------|--------|-------------|
| \`/api/onboard\` | \`POST\` | Generates a personalized checklist and timeline. |
| \`/api/readiness\`| \`POST\` | Calculates the dynamic Election Readiness Score. |
| \`/api/chat\` | \`POST\` | Communicates with the AI Assistant. |

---

## 🔮 Future Improvements

1. **Firebase Authentication**: Allow users to save their readiness score and return later.
2. **Civic API Integration**: Connect to real-time government APIs (e.g., Google Civic Information API) for live polling locations.
3. **SMS Reminders**: Implement Twilio to send users text alerts before registration deadlines.
4. **Multilingual Support**: Translate the UI and AI responses into Spanish, Mandarin, etc.

---

<div align="center">
  <i>Built to empower voters. Non-partisan and open-source.</i>
</div>
