import type { ApiResponse, Pagination, Translation } from "@/api/base-api-type";

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

export type GetLeagueMatchesResponse = ApiResponse<Pagination<LocationData>>;

export interface Tournament {
  id: number;
  name: string;
  name_translate: Translation;
  sport_id: number;
  country_id: number;
  location_id: number;
  logo: string;
}

export type GetTournamentsResponse = ApiResponse<Tournament[]>;
