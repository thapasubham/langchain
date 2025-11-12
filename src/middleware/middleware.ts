import { createAgent, createMiddleware, ToolMessage } from "langchain";


export const handleToolError = createMiddleware({
    name: "HandleToolError",
    wrapToolCall:(request, handler)=>{
        try{
return handler(request);
        }
        catch(error){
            return new ToolMessage({
                content: `Tool error: Please check your input and try again`,
                tool_call_id: request.toolCall.id!,
            })

        }
    }
})