import { WeatherCondition, WeatherData } from '@/types';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function mapCondition(main: string, temp: number): WeatherCondition {
  const m = main.toLowerCase();
  if (m === 'rain' || m === 'drizzle' || m === 'thunderstorm') return 'rain';
  if (m === 'snow') return 'snow';
  if (m === 'clouds') return 'clouds';
  if (temp >= 85) return 'hot';
  if (temp <= 50) return 'cold';
  if (m === 'clear') return 'clear';
  return 'clear';
}

export async function getCurrentWeather(lat: number, lng: number): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error('Missing OPENWEATHER_API_KEY');

  const url = `${BASE_URL}?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 600 } });

  if (!res.ok) throw new Error(`OpenWeather API error: ${res.status}`);

  const data = await res.json();
  const temp = Math.round(data.main.temp);

  return {
    temp,
    feelsLike: Math.round(data.main.feels_like),
    condition: mapCondition(data.weather[0].main, temp),
    description: `${data.weather[0].description}, ${temp}°F`,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
}
