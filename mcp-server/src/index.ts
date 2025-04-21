import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express, { Request, Response } from "express";
import z from "zod";
import { config } from "dotenv";
config();

const app = express();

const server = new McpServer({
  name: "mcp-ecommerce",
  version: "1.0.0",
});

const transports: { [sessionId: string]: SSEServerTransport } = {};

server.tool(
  "getWeather",
  "Get weather",
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `The weather in ${city} is sunny and the temperature is 25 degrees Celsius.`,
        },
      ],
    };
  }
);

app.get("/sse", async (req: Request, res: Response): Promise<any> => {
  const transport = new SSEServerTransport("/messages", res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
  console.log("Client connected:", transport.sessionId);
});

app.post("/messages", async (req: Request, res: Response): Promise<any> => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (!transport)
    return res.status(404).send("No transport found for sessionId");

  await transport.handlePostMessage(req, res);
});

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`MCP Server is running at http://localhost:${port}`);
});
