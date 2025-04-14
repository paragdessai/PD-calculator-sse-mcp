import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
const server = new McpServer({
    name: "calculatorDemo",
    version: "1.0.0"
});
// ... set up server resources, tools, and prompts ...
server.tool("calculate-bmi", {
    weightKg: z.number(),
    heightM: z.number()
}, async ({ weightKg, heightM }) => ({
    content: [{
            type: "text",
            text: String(weightKg / (heightM * heightM))
        }]
}));
// Add an addition tool
server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
}));
const app = express();
// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports = {};
app.get("/sse", async (req, res) => {
    // Get the full URI from the request
    const protocol = req.protocol;
    const host = req.get('host');
    const fullUri = `${protocol}://${host}/mcpfy/v1/calculatordemo`;
    const transport = new SSEServerTransport(fullUri, res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
        delete transports[transport.sessionId];
    });
    await server.connect(transport);
});
app.post("/mcpfy/v1/calculatordemo", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[sessionId];
    if (transport) {
        await transport.handlePostMessage(req, res);
    }
    else {
        res.status(400).send('No transport found for sessionId');
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
