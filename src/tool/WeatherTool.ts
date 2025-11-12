import { tool } from "langchain";
import { WeatherAPiCall } from "../external/weatherAPICall";
import * as z from "zod";

interface weatherProps {
    city: string
}

const cityLocation = z.object({
  city: z.string().describe("City name to get clothing advice based on weather"),
});

export const weatherTool = tool(
  async ({ city }) => {
    const weather = await WeatherAPiCall(city);
    return JSON.stringify(weather);
  },
  {
    name: "getWeather",
    description: "Return weather data and outfit suggestion for a city.",
    schema: cityLocation,
  }
);