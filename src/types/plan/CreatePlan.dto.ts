export interface CreatePlanDto {
  title: string;
  startAt: string;
  endAt: string;
  description: string | null;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  alarm: string; // none, on-event, before-5m, before-10m
}
