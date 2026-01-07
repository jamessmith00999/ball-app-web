import type { ApiResponse } from "@/api/base-api-type";
import type { Match } from "@/api/sports/matches/types";
import sportsApi from "@/api/sports/sports-api";

export type GetEarlyMatchesResponse = ApiResponse<{
  type: "1x2" | "hdp";
  matches: Match[];
}>;

export interface FetchEarlyMatchesParams {
  start_ts_in_s: number;
  end_ts_in_s: number;
}

export async function fetchEarlyMatches(params: FetchEarlyMatchesParams) {
  const response = await sportsApi.get<GetEarlyMatchesResponse>(
    "/api/v1/public/sport/early-matches",
    {
      params,
    },
  );
  return response.data.data;
}
