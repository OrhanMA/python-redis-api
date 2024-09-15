import { Skeleton } from "@/components/ui/skeleton";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CurrentWeather } from "@/lib/types";

export default function Weather({ weather }: { weather: CurrentWeather }) {
  return (
    <div className="m-6 mr-4 w-[325px]">
      <CardHeader className="pt-4 pb-2 px-0">
        <CardTitle className="text-2xl">{weather.current.name}</CardTitle>
      </CardHeader>
      <CardDescription>
        {weather.current.region} {weather.current.country}
      </CardDescription>
      <CardContent className="py-2 px-0 my-6 flex gap-6 text-xl font-bold">
        <p>{weather.current.current.condition}</p>
        <p>{weather.current.current.temperature}°C</p>
        <p>{weather.current.current.is_day == 0 ? "Night" : "Day"}</p>
      </CardContent>
      <CardFooter className="flex gap-4 p-0 text-neutral-500">
        <p>{weather.current.current.time}</p>
        <p>{weather.current.timezone}</p>
      </CardFooter>
    </div>
  );
}

export function SkeletonWeather() {
  return (
    <div className="m-2 mr-4 w-[325px]">
      <p className="text-neutral-400 animate-pulse mt-2">Searching...</p>
      <div className="pt-4 pb-2 px-0">
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="w-full h-2" />
      <div className="py-2 px-0 my-4 flex gap-6 text-xl font-bold">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
      <div className="flex gap-4 p-0 text-neutral-500">
        <Skeleton className="w-full h-2" />
      </div>
    </div>
  );
}
