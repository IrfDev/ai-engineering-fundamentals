import { DesignAgent } from "./agent";
import { routeAgentRequest } from "agents";

export { DesignAgent };

interface ENV {
  DesignAgent: DurableObjectNamespace;
  OPEN_AI_KEY: string;
}

export default {
  async fetch(request: Request, env: Env) {
    // return new Response("Not found", { status: 404 });

    let response =
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", {
        status: 404,
      });

    return response;
  },
} satisfies ExportedHandler<Env>;

interface Env {}
