export interface CurrentWeather {
  current: {
    country: string;
    current: {
      condition: string;
      is_day: number;
      temperature: number;
      time: string;
    };
    name: string;
    region: string;
    timezone: string;
  };
}
