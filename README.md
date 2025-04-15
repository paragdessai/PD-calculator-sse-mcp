# 🧮 Implementation of Calculator SSE MCP Server and Integration into Microsoft Copilot Studio and Github Copilot Agent

This is a demo Node.js + TypeScript MCP SDK using [Model Context Protocol SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk). It exposes simple calculation tools like BMI and addition through MCP, and supports real-time responses via Server-Sent Events (SSE).
Explore the MCP architecture and best practices using the [MCP Architecture](https://modelcontextprotocol.io/docs/concepts/architecture) and SSE transport
---

## 🚀 Features

- ✅ **SSE (Server-Sent Events) Support**
- ✅ **BMI Calculator Tool**
- ✅ **Addition Tool**
- ✅ **MCP Tool + Github Copilot Agent Integration**
- ✅ **MCP Tool + Microsoft Copilot Studio Integration**
- ✅ **Azure App Service Ready**

## 📁 Project Structure

<p align="left"> <img src="https://github.com/user-attachments/assets/8cb871fd-bc53-4dcb-a946-916be2ea8286" width="200"/> </p>

## ⚙️Quick Start

```bash
npm install      # Install dependencies
npm run build    # Compile TypeScript
npm run start    # Start server (http://localhost:3001)
```

The app will run at <http://localhost:3001> (unless configured otherwise).

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

## 🖥️ **MCP Tool + Github Copilot Agent Integration (VSCode)**

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

## 🖥️ **MCP Tool + Microsoft Copilot Studio Integration (Custom Connector)**

For details on integrating Model Context Protocol (MCP) tools into Microsoft Copilot Studio using custom connectors, check out the official Microsoft documentation: 🔗 [Extend Copilot actions using MCP in Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp)

# MCP Custom connector Copilot Studio Integration

It shows how to set up the MCP Tools for actions to work with custom connectors in **Copilot Studio**.

---

## Swagger Specification

```yaml
swagger: '2.0'
info:
  title: MCPCalculatorDemo
  description: Calculate BMI and Calculate sum using MCP SSE server
  version: '1.0'
host: calculatormcp-dummyurl.azurewebsites.net
basePath: /
schemes:
  - https
definitions:
  QueryResponse:
    type: object
    properties:
      jsonrpc:
        type: string
      id:
        type: string
      method:
        type: string
      params:
        type: object
      result:
        type: object
      error:
        type: object
paths:
  /sse:
    get:
      summary: MCP Server Actions for calculating BMI and sum
      parameters:
        - in: query
          name: sessionId
          type: string
          required: false
      produces:
        - application/json
      responses:
        '200':
          description: Immediate Response
          schema:
            $ref: '#/definitions/QueryResponse'
        '201':
          description: Created and will follow callback
      operationId: CalculatorDemo
      tags:
        - Agentic
        - McpSse
securityDefinitions: {}
security: []

```
![image](https://github.com/user-attachments/assets/7727d5b9-f4c8-44bd-8293-aa4bd7957133)

# Using MCP Server Action in Copilot Studio

## Steps to Access the MCP Server Action

1. **Open Copilot Studio**  
   Navigate to your [Copilot Studio](https://copilotstudio.microsoft.com) workspace.

2. **Go to Actions**  
   Click on the **Action** menu in the left sidebar.

3. **Select "Custom connector"**  
   Under the Action menu, choose **Custom connector**.

4. **Locate the MCP Server Action**  
   The system will automatically display available tools. Select the **MCP Server Action** from the list.

   ![Custom Connector Selection](https://github.com/user-attachments/assets/ee74ce02-a1f1-4835-a0a9-9b26ab0f7367)

5. **MCP Server Action Preview**  
   You will be able to view the details of the selected MCP Server Action as shown below:

   ![MCP Server Action](https://github.com/user-attachments/assets/2992d2b3-af6e-4d61-a0d5-96ae3ba60fe1)

## 📌 Considerations

- ✅ The `/sse` endpoint should **return the full URI** (including protocol and host) when initializing the **MCP transport**. This ensures compatibility when deploying across environments (e.g., localhost vs Azure). It establishes a live connection for streaming MCP interactions.

  **Example:**

  ```ts
  const protocol = req.protocol;
  const host = req.get('host');
  const fullUri = `${protocol}://${host}/mcp`;

### 🔄 Return / Server-Sent Events (SSE) with Full URI

Ensure your custom connector supports **SSE (Server-Sent Events)** and returns the **full URI** as shown:
![Return SSE with Full URI](https://github.com/user-attachments/assets/1da61513-ea89-4c48-8bf8-096a26ed3e69)

### 🏷️ Add Tags to Your Custom Connector
```yaml
tags:
  - Agentic
  - McpSse
```
### ⚠️ Naming Guidance
Do **not** use `"InvokeMCP"` as your `operationId`.  
Choose a more specific and descriptive name to reflect the purpose of the action and avoid conflicts.

> **Note:**  
> This is a **sample demo custom MCP server** designed for demonstration, deployed into Azure and integration purposes with **Copilot Studio**.  
> It is **not available as part of the product** and is intended solely for sample or prototyping use.
> 
## ☁️ Deploy to Azure (Optional)

Create an Azure App Service (Node.js 18+)
Set the startup command (if needed):

```bash
npm run build && npm run start
