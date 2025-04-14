# calculator-sse
# 🧮 Calculator SSE API

This is a demo Node.js + TypeScript API using [Model Context Protocol SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk). It exposes simple calculation tools like BMI and addition through MCP, and supports real-time responses via Server-Sent Events (SSE).

---

## 🚀 Features

- ✅ **BMI Calculator Tool**
- ✅ **Addition Tool**
- ✅ **MCP Tool Integration**
- ✅ **SSE (Server-Sent Events) Support**
- ✅ **TypeScript Project Structure**
- ✅ **Azure App Service Ready**

---

## 📁 Project Structure

calculator-sse/ ├── src/ │ └── index.ts # Main Express server with MCP tools ├── dist/ # Compiled JS output (after build) ├── package.json ├── tsconfig.json └── README.md

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

Compiles TypeScript from src/ into dist/.

### 3. Start the Server

```bash
npm run start
```

The app will run at http://localhost:3001 (unless configured otherwise).

🧪 MCP Tools
🔹 calculate-bmi
Input:
{
  "weightKg": 70,
  "heightM": 1.75
}
Response:

```json
{
  "content": [{ "type": "text", "text": "22.86" }]
}
```

🔹 add
Input
{
  "a": 5,
  "b": 3
}
Response:

{
  "content": [{ "type": "text", "text": "8" }]
}
🔁 SSE Endpoint
The server supports Server-Sent Events (SSE) via:

```bash
GET /sse

It establishes a live connection for streaming MCP interactions.

☁️ Deploy to Azure (Optional)
Push your code to GitHub

Create an Azure App Service (Node.js 18+)

Set the startup command (if needed):
npm run build && npm run start

