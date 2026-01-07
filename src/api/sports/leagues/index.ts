import type { ApiResponse, Pagination } from "@/api/base-api-type";
import type { InPlayMatchesType } from "@/api/sports/inplay";
import type { Match } from "@/api/sports/matches/types";
import sportsApi from "@/api/sports/sports-api";
import type { LocationData } from "@/api/sports/tournaments/types";

export interface GetEarlyLeaguesParams {
  sport_id: number;
  start_ts_in_s: number;
  end_ts_in_s: number;
}

export type GetEarlyLeaguesResponse = ApiResponse<LocationData[]>;

export interface GetEarlyLeagueDetailsParams {
  page: number;
  page_size: number;
  sport_id: number;
  tournament_ids: string;
  type: InPlayMatchesType;
  start_ts_in_s?: number;
  end_ts_in_s?: number;
}

export type GetEarlyLeagueDetailsResponse = ApiResponse<Pagination<Match>>;

/**
 * Get early leagues
 */
export async function getEarlyLeagues({
  sport_id,
  start_ts_in_s,
  end_ts_in_s,
}: GetEarlyLeaguesParams): Promise<GetEarlyLeaguesResponse> {
  try {
    const response = await sportsApi.get<GetEarlyLeaguesResponse>(
      "/api/v1/public/sport/early-leagues",
      {
        params: {
          sport_id,
          start_ts_in_s,
          end_ts_in_s,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching early leagues:", error);
    throw error;
  }
}

/**
 * Get early league details
 */
export async function getEarlyLeagueDetails(
  params: GetEarlyLeagueDetailsParams,
): Promise<Pagination<Match> | null> {
  try {
    const response = await sportsApi.get<GetEarlyLeagueDetailsResponse>(
      "/api/v1/public/sport/early-league-details",
      {
        params,
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching early league details:", error);
    throw error;
  }
}
