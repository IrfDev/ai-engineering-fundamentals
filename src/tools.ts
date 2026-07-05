import { tool } from "ai";
import { z } from "zod";

export const tools = {
  generateDiagram: tool({
    description:
      "Generate a complete diagram as an array of Excalidraw elements. Use this when the user asks you to create, draw, or design a new diagram. Return all elements needed including shapes, text labels, and arrows/lines connecting them. Position elements with x,y coordinates and give each a unique id.",

    // Guaranteer that the input schema from the LLM will return the elements in the shape and schema we defined.
    execute: async ({ elements }) => {
      return { elements };
    },

    // We have the input schema so we can validate the input.
    inputSchema: z.object({
      elements: z.object(
        z.object({
          id: z.string().describe("Unique identifier"),
          type: z.enum([
            "rectangle",
            "ellipse",
            "diamond",
            "text",
            "arrow",
            "line",
          ]),
          x: z.number().describe("X position"),
          y: z.number().describe("Y position"),
          width: z.number().describe("Width"),
          height: z.number().describe("Height"),
          strokeColor: z
            .string()
            .default("#1e1e1e")
            .describe("Stroke color (hex)"),
          backgroundColor: z
            .string()
            .default("transparent")
            .describe("Fill color"),
          fillStyle: z
            .enum(["solid", "hachure", "cross-hatch"])
            .default("solid"),
          strokeWidth: z.number().default(2),
          roughness: z
            .number()
            .default(1)
            .describe("0 for clean, 1 for sketchy"),
          opacity: z.number().default(100),
          text: z
            .string()
            .optional()
            .describe("Text content (for text elements)"),
          fontSize: z.number().default(20),
          fontFamily: z
            .number()
            .default(1)
            .describe("1=Virgil, 2=Helvetica, 3=Cascadia"),
          textAlign: z.enum(["left", "center", "right"]).default("center"),
          points: z
            .array(z.array(z.number()))
            .optional()
            .describe(
              "Array of [x,y] points (for arrow/line elements). Each point is a two number array.",
            ),
          startBinding: z
            .object({
              elementId: z.string(),
              focus: z.number(),
              gap: z.number(),
            })
            .optional()
            .describe("Bind arrow start to an element"),
          endBinding: z
            .object({
              elementId: z.string(),
              focus: z.number(),
              gap: z.number(),
            })
            .optional()
            .describe("Bind arrow end to an element"),
        }),
      ),
    }),
  }),

  modifyDiagram: tool({
    description:
      "Modify an existing element on the canvase by id. Set only the fields you want to modify",
    inputSchema: z.object({
      elementId: z.string().describe("ID of the element to modify"),
      updates: z.object({
        x: z.number().describe("X position"),
        y: z.number().describe("Y position"),
        width: z.number().describe("Width"),
        height: z.number().describe("Height"),
        strokeColor: z
          .string()
          .default("#1e1e1e")
          .describe("Stroke color (hex)"),
        backgroundColor: z
          .string()
          .default("transparent")
          .describe("Fill color"),
        fillStyle: z.enum(["solid", "hachure", "cross-hatch"]).default("solid"),
        strokeWidth: z.number().default(2),
        roughness: z.number().default(1).describe("0 for clean, 1 for sketchy"),
        opacity: z.number().default(100),
        text: z
          .string()
          .optional()
          .describe("Text content (for text elements)"),
        fontSize: z.number().default(20),
        fontFamily: z
          .number()
          .default(1)
          .describe("1=Virgil, 2=Helvetica, 3=Cascadia"),
        textAlign: z.enum(["left", "center", "right"]).default("center"),
        points: z
          .array(z.array(z.number()))
          .optional()
          .describe(
            "Array of [x,y] points (for arrow/line elements). Each point is a two number array.",
          ),
        startBinding: z
          .object({
            elementId: z.string(),
            focus: z.number(),
            gap: z.number(),
          })
          .optional()
          .describe("Bind arrow start to an element"),
        endBinding: z
          .object({
            elementId: z.string(),
            focus: z.number(),
            gap: z.number(),
          })
          .optional()
          .describe("Bind arrow end to an element"),
      }),
    }),
    execute: async ({ elementId, updates }) => {
      // Modify the element with the given it using the updates object
      // Return the modified element

      return { elementId, updates };
    },
  }),
};
