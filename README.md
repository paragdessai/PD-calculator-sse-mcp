# Calculator MCP SSE Server
# 🧮 Calculator SSE MCP Server

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
![image](https://github.com/user-attachments/assets/8cb871fd-bc53-4dcb-a946-916be2ea8286)


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

## 🧪 MCP Tools
### 🔹 calculate-bmi
Input:
```json
{
  "weightKg": 70,
  "heightM": 1.75
}
```

Response:

```json
{
  "content": [{ "type": "text", "text": "22.86" }]
}
```

### 🔹 add
Input

```json
{
  "a": 5,
  "b": 3
}
```

Response:
```json
{
  "content": [{ "type": "text", "text": "8" }]
}
```

## 🔁 SSE Endpoint
The server supports Server-Sent Events (SSE) via:

```bash
GET /sse
```
It establishes a live connection for streaming MCP interactions.

## ☁️ Deploy to Azure (Optional)
Create an Azure App Service (Node.js 18+)
Set the startup command (if needed):
```bash
npm run build && npm run start

