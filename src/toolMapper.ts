import { getDetails } from "./tool/DetailsTool";
import { weatherTool } from "./tool/WeatherTool";

export const toolMapping: Record<string, any> = {
    getWeather: weatherTool,
    getDetails: getDetails,
  };