import sportsApi from "@/api/sports/sports-api";
import type { GetLeagueMatchesResponse } from "@/api/sports/tournaments/types";

import type {
  FetchMatchesParams,
  GetEarlyMatchesResponse,
  GetMatchDetailResponse,
  GetMatchResultsResponse,
  GetMatchScoreResponse,
} from "./types";

/**
 * fetch matches
 */
export async function fetchMatches({
  areaIds,
  sportId,
  statusIds,
  marketIds,
  page,
  pageSize,
  startTsInS,
  endTsInS,
  tournamentIds,
  outcomeStatusIds = "0", // 0: Open 1: Suspended 2: Settled
  sortBy = "match_time",
  sortOrder = "asc",
}: FetchMatchesParams) {
  const response = await sportsApi.get<GetEarlyMatchesResponse>(
    "/api/v1/client/matches",
    {
      params: {
        area_ids: areaIds,
        sport_id: sportId,
        status_ids: statusIds,
        start_ts_in_s: startTsInS,
        end_ts_in_s: endTsInS,
        page,
        page_size: pageSize,
        market_ids: marketIds,
        tournament_ids: tournamentIds,
        outcome_status_ids: outcomeStatusIds,
        sort_by: sortBy,
        sort_order: sortOrder,
      },
    },
  );
  return response?.data?.data;
}

/**
 * fetch public matches (no authentication required)
 */
export async function fetchPublicMatches({
  areaIds,
  sportId,
  statusIds,
  marketIds,
  page,
  pageSize,
  startTsInS,
  endTsInS,
  tournamentIds,
  outcomeStatusIds = "0", // 0: Open 1: Suspended 2: Settled
  sortBy = "match_time",
  sortOrder = "asc",
}: FetchMatchesParams) {
  const response = await sportsApi.get<GetEarlyMatchesResponse>(
    "/api/v1/public/matches",
    {
      params: {
        area_ids: areaIds,
        sport_id: sportId,
        status_ids: statusIds,
        start_ts_in_s: startTsInS,
        end_ts_in_s: endTsInS,
        page,
        page_size: pageSize,
        market_ids: marketIds,
        tournament_ids: tournamentIds,
        outcome_status_ids: outcomeStatusIds,
        sort_by: sortBy,
        sort_order: sortOrder,
      },
    },
  );
  return response?.data?.data;
}

// fetch match detail by match id
export async function fetchMatchDetail(matchId: string) {
  const response = await sportsApi.get<GetMatchDetailResponse>(
    `/api/v1/public/matches/${matchId}`,
  );
  return response?.data?.data;
}

export async function getLeagueMatches({
  sportId,
  statusIds,
  startTsInS,
  endTsInS,
}: {
  sportId: number;
  statusIds: string;
  startTsInS: number;
  endTsInS: number;
}): Promise<GetLeagueMatchesResponse> {
  try {
    const response = await sportsApi.get<GetLeagueMatchesResponse>(
      "/api/v1/public/matches/locations",
      {
        params: {
          sport_id: sportId,
          status_ids: statusIds,
          start_ts_in_s: startTsInS,
          end_ts_in_s: endTsInS,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching league matches:", error);
    throw error;
  }
}

export async function getMatchResults({
  sportId,
  statusIds,
  tournamentIds,
  startTsInS,
  endTsInS,
}: {
  sportId: number;
  statusIds: string;
  tournamentIds?: string;
  startTsInS: number;
  endTsInS: number;
}) {
  const response = await sportsApi.get<GetMatchResultsResponse>(
    "/api/v1/public/matches/results",
    {
      params: {
        sport_id: sportId,
        status_ids: statusIds,
        tournament_ids: tournamentIds,
        start_ts_in_s: startTsInS,
        end_ts_in_s: endTsInS,
      },
    },
  );
  return response.data;
}

export async function getMatchResultMetric(matchId: number) {
  const response = await sportsApi.get<GetMatchScoreResponse>(
    `/api/v1/public/match/scores?match_id=${matchId}`,
  );
  return response.data;
}
