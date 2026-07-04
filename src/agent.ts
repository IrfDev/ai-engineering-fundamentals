import { AIChatAgent } from "@cloudflare/ai-chat";
import { streamText } from "ai";
import { tools } from "./tools";

export class DesignAgent extends AIChatAgent {
  async onChatMessage() {
    const result = streamText({
      model: openai("gpt-5.4-mini"),
    });
  }
}
º;
