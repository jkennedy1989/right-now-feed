'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES } from '@/data/city-meta';
import { Cloud, CloudRain, Sun, Snowflake, Wind } from 'lucide-react';

const WEATHER_ICONS: Record<string, React.ReactNode> = {
  clear: <Sun size={14} className="text-yellow-500" />,
  clouds: <Cloud size={14} className="text-gray-400" />,
  rain: <CloudRain size={14} className="text-blue-400" />,
  snow: <Snowflake size={14} className="text-blue-200" />,
  hot: <Sun size={14} className="text-orange-500" />,
  cold: <Snowflake size={14} className="text-blue-300" />,
  windy: <Wind size={14} className="text-gray-400" />,
};

function formatTime(timezone: string): string {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function WeatherTicker() {
  const { signals, selectedCity } = useAppContext();
  const weather = signals.weather;
  const timezone = CITIES[selectedCity].timezone;

  const [time, setTime] = useState(() => formatTime(timezone));

  useEffect(() => {
    setTime(formatTime(timezone));
    const interval = setInterval(() => {
      setTime(formatTime(timezone));
    }, 60_000);
    return () => clearInterval(interval);
  }, [timezone]);

  if (!weather) {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <span>{time}</span>
        <span className="text-gray-300">·</span>
        <Sun size={14} className="animate-pulse" />
        <span>--°</span>
      </div>
    );
  }

  const icon = WEATHER_ICONS[weather.condition] || WEATHER_ICONS.clear;

  return (
    <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
      <span>{time}</span>
      <span className="text-gray-300">·</span>
      {icon}
      <span>{Math.round(weather.temp)}°F</span>
    </div>
  );
}
