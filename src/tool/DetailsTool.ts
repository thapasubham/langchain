import { tool } from "langchain";
import * as z from "zod";

export const Game = z.object({
  title: z.string().describe("Name of the game"),
  genre: z.string().describe("Genre of the game"),
  developer: z.string().describe("The team that made the game"),
  year: z.number().describe("Release year of the game"),
  annual_income: z
    .string()
    .describe(
      "Total earning if it's a movie or TV show, and annual earning if it's a multiplayer game"
    ),
});

export const getDetails = tool(
  async ({ title, genre, developer, year, annual_income }) => {
    const result = { title, genre, developer, year, annual_income };
    return JSON.stringify(result);
  },
  {
    name: "getDetails",
    description: "Provides structured JSON details about a specific game.",
    schema: Game,
  }
);