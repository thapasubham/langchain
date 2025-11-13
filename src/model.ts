import { ChatGroq } from "@langchain/groq";
import { weatherTool } from "./tool/WeatherTool";
import { Game, getDetails } from "./tool/DetailsTool";
import { createAgent } from "langchain";
import { handleToolError } from "./middleware/middleware";


 const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.1,
  apiKey: process.env.GROQ_API_KEY as string,
});

export const llmWithTools = model.bindTools([weatherTool, getDetails]);
