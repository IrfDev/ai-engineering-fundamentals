import { AIChatAgent } from "@cloudflare/ai-chat";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { tools } from "./tools";
import { createOpenAI, openai } from "@ai-sdk/openai";

interface ENV {
  OPEN_AI_KEY: string;
}

// Context that you pass to the agent, that will be attached to every chat
const SYSTEM_PROMPT = `You're a diagram design assistant. You help users create and modify diagrams`;

export class DesignAgent extends AIChatAgent {
  async onChatMessage() {
    const openAIKey = createOpenAI({
      apiKey: this.env.OPEN_AI_KEY,
    });

    const result = streamText({
      model: openai("gpt-5.4-mini"),
      system: SYSTEM_PROMPT,
      // This tool will just create an specific formatting for the messages
      // This is just better for formatting, cos the messages object is not that useful
      messages: await convertToModelMessages(this.messages),
      tools,
      stopWhen: stepCountIs(6),
      providerOptions: {
        openai: {
          strictJsonSchema: false,
        },
      },
    });

    return result.toUIMessageStreamResponse();
  }
}
