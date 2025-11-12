export async function WeatherAPiCall(city: string) {
    const api_key = process.env.WEATHER_API;

    if (!api_key) {
        throw new Error("API key is not defined in environment variables");
    }
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}&units=metric`
    );

    const result = await response.json();

    if (result.cod !== 200) {
        throw new Error(`Failed to retrieve weather data: ${result.message}`);
    }

    const weatherDescription = result.weather[0].main; // weather is an array
    const temperature = result.main.temp;

return {weatherDescription, temperature}
}
