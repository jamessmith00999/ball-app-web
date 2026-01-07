import type { ApiResponse, Pagination, Translation } from "@/api/base-api-type";

export interface Tournament {
  id: number;
  name: string;
  name_translate: Translation;
  sport_id: number;
  country_id: number;
  location_id: number;
  logo: string;
}

export interface Outcome {
  id: number;
  display_name: string;
  display_name_translate: Translation;
  name: string;
  name_translate: Translation;
  line: string;
  status: number; // 0 Open 1 Suspended 2 Settled
  value: string;
  uptime: number;
  change: number; // 0: no change, 1: up, 2: down
}

export interface Odd {
  odd_id: number;
  market_id: number;
  name: string;
  name_translate: Translation;
  sport_id: number;
  match_id: number;
  uptime: number;
  category: number;
  score: string;
  line_score: number;
  bookmaker_id: number;
  main_line: string;
  outcomes: Outcome[];
}

export interface Outright {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sport_id: number;
  status_id: number;
  tournament: Tournament;
  season: string;
  odds: Odd[];
}

export interface Location {
  id: number;
  name: string;
  name_translate: Translation;
  logo: string;
}

export interface TournamentWithMatches {
  id: number;
  name: string;
  name_translate: Translation;
  sport_id: number;
  country_id: number;
  location_id: number;
  logo: string;
  matches_num: number;
}

export interface LocationData {
  location: Location;
  tournaments: TournamentWithMatches[];
}

export type GetOutrightsResponse = ApiResponse<Pagination<LocationData>>;

export type OutrightsResponse = ApiResponse<Pagination<Outright>>;
