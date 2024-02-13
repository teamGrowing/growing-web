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

export interface MonthlyPlanDto {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
}

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
