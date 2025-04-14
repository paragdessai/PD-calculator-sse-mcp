# Calculator MCP SSE Server
# 🧮 Calculator SSE MCP Server

This is a demo Node.js + TypeScript MCP SDK using [Model Context Protocol SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk). It exposes simple calculation tools like BMI and addition through MCP, and supports real-time responses via Server-Sent Events (SSE).
Explore the MCP architecture and best practices using the [MCP Architecture](https://modelcontextprotocol.io/docs/concepts/architecture) and SSE transport.
---

## 🚀 Features

- ✅ **SSE (Server-Sent Events) Support**
- ✅ **BMI Calculator Tool**
- ✅ **Addition Tool**
- ✅ **MCP Tool Github Copilot Agent Integration**
- ✅ **MCP Tool Microsoft Copilot Studio Integration**
- ✅ **Azure App Service Ready**

## 📁 Project Structure
<p align="left"> <img src="https://github.com/user-attachments/assets/8cb871fd-bc53-4dcb-a946-916be2ea8286" width="200"/> </p>

## ⚙️Quick Start
```bash
npm install      # Install dependencies
npm run build    # Compile TypeScript
npm run start    # Start server (http://localhost:3001)
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

### 🔹 calculate-sum
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
---

## 📌 Considerations

- ✅ The `/sse` endpoint should **return the full URI** (including protocol and host) when initializing the **MCP transport**. This ensures compatibility when deploying across environments (e.g., localhost vs Azure). It establishes a live connection for streaming MCP interactions.

  **Example:**
  ```ts
  const protocol = req.protocol;
  const host = req.get('host');
  const fullUri = `${protocol}://${host}/mcp`;

**Return /SSE with FULL URI**

  ![image](https://github.com/user-attachments/assets/15ce02fb-216b-4f87-8190-ed948bfdcca8)

## 🖥️ **MCP Tool Github Copilot Agent Integration (VSCode)**
1. Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Type **"Add MCP Server"** and select it.
3. Update `.vscode/mcp.json` with the following:

```json
{
    "servers": {
        "my-mcp-server": {
            "type": "sse",
            "url": "http://localhost:3001/sse"
        }
    }
}
```
<p align="left"> <img src="https://github.com/user-attachments/assets/5109619f-071e-41f9-aa92-f37a767306ac" width="400"/> </p>

**Result in Github Copilot Agent**
<p align="left"> <img src="https://github.com/user-attachments/assets/e4c0977c-a388-42cb-8f98-9f6cb84d3978" width="400"/> </p>
The server appears and is connected successfully.

## 🖥️ **MCP Tool Microsoft Copilot Studio Integration (Custom Connector)**


## ☁️ Deploy to Azure (Optional)
Create an Azure App Service (Node.js 18+)
Set the startup command (if needed):
```bash
npm run build && npm run start

