export interface DailyPlanDto {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  description: string | null;
  location: {
    latitude: number; // default value 0
    longitude: number; // default value 0
    address: string;
  } | null;
  alarm: string; // none, on-event, before-5m, before-10m
}
