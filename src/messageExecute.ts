import { ChatGroq } from "@langchain/groq";
import {
  createAgent,
  tool,
  HumanMessage,
  ToolMessage,
  SystemMessage,
} from "langchain";
import { handleToolError } from "./middleware/middleware";
import { finalPrompt, systemPrompt } from "./prompt";
import { getDetails } from "./tool/DetailsTool";
import { toolMapping } from "./toolMapper";
import { weatherTool } from "./tool/WeatherTool";
import { llmWithTools } from "./model";





export async function ExecuteMsg(input: string) {
  const messages = [
  new SystemMessage(systemPrompt),
  new HumanMessage(input),
];
  const llmOutput = await llmWithTools.invoke(messages);
  messages.push(llmOutput);

  

  if (llmOutput.tool_calls && llmOutput.tool_calls.length > 0) {
    for await (const toolCall of llmOutput.tool_calls) {
      const tool = toolMapping[toolCall.name];
      if (!tool) continue;

      const toolOutput = await tool.invoke(toolCall.args);
      const newTM = new ToolMessage({
        tool_call_id: toolCall.id as string,
        name: toolCall.name,
        content: toolOutput,
      });

      messages.push(newTM);
    }

    messages.push(
      new SystemMessage(
       finalPrompt
      )
    );

    const finalOutput = await llmWithTools.invoke(messages);

    try {
      const parsed = JSON.parse(finalOutput.content as string || "{}");
      console.log(JSON.stringify(parsed, null, 2));
    } catch {
      console.log(finalOutput.content || "{}");
    }
  } else {
    try {
      const parsed = JSON.parse(llmOutput.content  as string|| "{}");
      console.log(JSON.stringify(parsed, null, 2));
    } catch {
      console.log(llmOutput.content || "{}");
    }
  }
}


