import type { ApiResponse, Pagination, Translation } from "@/api/base-api-type";

// Core Match Types

export interface Team {
  id: number;
  name: string;
  name_translate: Translation;
  logo: string;
}

export interface Tournament {
  id: number;
  name: string;
  name_translate: Translation;
  sport_id: number;
  country_id: number;
  location_id: number;
  logo: string;
}

export interface Scores {
  p1: number[] | null;
  p2: number[] | null;
  p3: number[] | null;
  p4: number[] | null;
  ft: number[] | null;
  ot: number[] | null;
  ht: number[] | null;
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

export interface Match {
  match_id: number;
  sport_id: number;
  status_id: number;
  match_time: number;
  timer: number[] | null;
  period: number;
  neutral: boolean;
  hide: boolean;
  scores: Scores;
  home: Team;
  away: Team;
  tournament: Tournament;
  odds: Odd[] | null;
  is_favorite: boolean;
  open_odd_num: number;
}

// Request/Response Types

export type FetchEarlyMatchesParams = Omit<FetchMatchesParams, "endTsInS">;

export interface FetchMatchesParams {
  areaIds?: string;
  sportId?: number;
  statusIds?: string;
  pageSize?: number;
  page?: number;
  marketIds?: string;
  startTsInS?: number;
  endTsInS?: number;
  tournamentIds?: string;
  outcomeStatusIds?: string; // 0: Open 1: Suspended 2: Settled
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type GetEarlyMatchesResponse = ApiResponse<Pagination<Match>>;

export type GetMatchDetailResponse = ApiResponse<Match>;

export interface Location {
  id: number;
  name: string;
  name_translate: Translation;
  logo: string;
}

export interface LocationWithTournamentsAndMatches {
  location: Location;
  tournaments: (Tournament & { matches: Match[] })[];
}

export type GetMatchResultsResponse = ApiResponse<
  Pagination<LocationWithTournamentsAndMatches>
>;

// Newest Odds Types

export interface NewestOddsRequest {
  order_list: Array<{
    order_type_id: number; // 1: common, 2: outright
    amount: number;
    currency: string;
    match_id: number; // if order_type_id is 1, match_id is required. 0 means no match
    odd_id: number;
    market_id: number;
    outcome_id: number;
    outcome_value: number;
  }>;
}

export interface NewestOddsMatch {
  match_id: number;
  order_type_id: number;
  odds: Odd[];
  invalid: boolean; // true means the odds is expired
}

export type GetNewestOddsResponse = ApiResponse<NewestOddsMatch[]>;

// Match Score Types

export interface MatchScoreData {
  data: {
    id: number;
    sport_id: number;
    score: {
      results: string[];
    };
    periods: {
      period: number;
      period_name: string;
      results: string[];
      incidents: any[];
    }[];
    stats: {
      type: number;
      type_name: string;
      results: string[];
      incidents: any[];
    }[];
  };
}

export type GetMatchScoreResponse = ApiResponse<MatchScoreData>;
