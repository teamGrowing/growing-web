export interface PatchPlanDto {
  title?: string;
  startAt?: string;
  endAt?: string;
  description?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  alarm?: string; // none, on-event, before-5m, before-10m
}
