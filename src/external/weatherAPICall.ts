const cache = new Map<string, { data: any; timestamp: number }>();

export async function WeatherAPiCall(city: string) {
  const now = Date.now();

  const cached = cache.get(city);
  if (cached && now - cached.timestamp < 600_000) {
    console.log("Using cached data for", city);
    return cached.data;
  }

  const api_key = process.env.WEATHER_API;
  if (!api_key) {
    throw new Error("API key is not defined in environment variables");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}&units=metric`
  );

  const result = await response.json();

  if (result.cod !== 200) {
    throw new Error(`Failed to retrieve weather data: ${result.message}`);
  }

  const weatherDescription = result.weather[0].description;
  const temperature = result.main.temp;

  const data = {
    city: result.name,
    weatherDescription,
    temperature,
    fetchedAt: new Date().toLocaleTimeString(),
  };

  cache.set(city, { data, timestamp: now });

  console.log("Fetched new data for", city);

  return data;
}
