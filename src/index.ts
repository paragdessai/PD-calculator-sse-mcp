// src/index.ts
import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import fetch from "node-fetch";
import { z } from "zod";

// 1️⃣ Create the MCP server and register your tools:
const server = new McpServer({
  name: "calculatorDemo",
  version: "1.0.0",
});

// BMI tool
server.tool(
  "calculate-bmi",
  { weightKg: z.number(), heightM: z.number() },
  async ({ weightKg, heightM }) => ({
    content: [
      {
        type: "text",
        text: `BMI: ${(weightKg / (heightM * heightM)).toFixed(2)}`,
      },
    ],
  })
);

// Sum tool
server.tool(
  "calculate-sum",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [
      {
        type: "text",
        text: `Sum: ${a + b}`,
      },
    ],
  })
);

// Country-facts tool
server.tool(
  "country-facts",
  { country: z.string() },
  async ({ country }) => {
    const resp = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
    );
    const [info] = await resp.json();
    const capital = info.capital?.[0] ?? "Unknown";
    const region = info.region;
    const population = info.population;
    return {
      content: [
        { type: "text", text: `Capital city: ${capital}` },
        { type: "text", text: `Region: ${region}` },
        { type: "text", text: `Population: ${population.toLocaleString()}` },
      ],
    };
  }
);

// 2️⃣ Set up Express and JSON parsing
const app = express();
app.use(express.json());

// 3️⃣ SSE transport lookup
const transports: { [sessionId: string]: SSEServerTransport } = {};

// SSE endpoint
app.get("/sse", async (req: Request, res: Response) => {
  const protocol = req.protocol;
  const host = req.get("host");
  const fullUri = `${protocol}://${host}/mcpfy/v1/calculatordemo`;
  const transport = new SSEServerTransport(fullUri, res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

// JSON-RPC endpoint for MCP tool calls
app.post("/mcpfy/v1/calculatordemo", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send("No transport found for sessionId");
  }
});

// Health-check
app.get("/", (_req, res) => {
  res.send("MCP Calculator Demo is running!");
});

// 4️⃣ Standalone HTTP endpoints (for Custom Connector)
app.post("/sum", (req: Request, res: Response) => {
  const { a, b } = req.body;
  res.json({ sum: a + b });
});

app.post("/bmi", (req: Request, res: Response) => {
  const { weightKg, heightM } = req.body;
  const bmi = weightKg / (heightM * heightM);
  res.json({ bmi });
});

app.post("/country-facts", async (req: Request, res: Response) => {
  const { country } = req.body;
  const resp = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
  );
  const [info] = await resp.json();
  res.json({
    capital: info.capital?.[0] ?? null,
    region: info.region,
    population: info.population,
  });
});

// 5️⃣ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
