import { config } from "dotenv";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { CoreMessage, generateText, tool } from "ai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { z } from "zod";

config();

const mcpClient = new Client({
  name: "mcp-client-ecommerce",
  version: "1.0.0",
});

export const connectToMCPServer = async () => {
  try {
    const transport = new SSEClientTransport(
      new URL("http://localhost:8001/sse")
    );

    await mcpClient.connect(transport);
  } catch (err) {
    console.error("Error connecting to MCP server:", err);
  }
};

const listTools = async () => {
  const tools = (await mcpClient.listTools()).tools;
  tools.forEach((tool) => {
    console.log(`- ${tool.name}: ${tool.description}`);
  });
};

enum TOOLS {
  GET_WEATHER = "getWeather",
}

const callTool = async (toolName: TOOLS, args: any) => {
  const result = await mcpClient.callTool({
    name: toolName,
    arguments: args,
  });

  return result;
};

const getGemini = async () => {
  const gemini = await createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  return gemini;
};

const describeTools = () => {
  const tools = {
    // Tool to get the weather for a city
    getWeather: tool({
      description: "Get weather information for a city",
      parameters: z.object({
        city: z.string().describe("City name"),
      }),
      execute: async (args) => {
        const result = await callTool(TOOLS.GET_WEATHER, args);
        return result.content as object[];
      },
    }),
  };

  return tools;
};

export const mcp = async (chats: CoreMessage[]) => {
  try {
    const ai = await getGemini();

    const { text, files } = await generateText({
      model: ai("gemini-2.0-flash-001"),
      messages: chats,
      tools: describeTools(),
      maxSteps: 2,
    });

    return { text, files };
  } catch (err) {
    console.log("Error in mcp response:", err);
  }
};
