export interface PatchPlanDto {
  title?: string;
  startAt?: string;
  endAt?: string;
  description?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  alarm?: string; // none, on-event, before-5m, before-10m
}
