import type { ApiResponse, Pagination } from "@/api/base-api-type";
import type { InPlayMatchesType } from "@/api/sports/inplay";
import type { Match } from "@/api/sports/matches/types";
import sportsApi from "@/api/sports/sports-api";

export type GetSoonMatchesResponse = ApiResponse<Pagination<Match>>;

export interface FetchSoonMatchesParams {
  page: number;
  page_size: number;
  type: InPlayMatchesType;
  start_ts_in_s: number;
  end_ts_in_s: number;
  sport_id?: number;
}

export async function fetchSoonMatches(
  params: FetchSoonMatchesParams,
  token?: string
) {
  const response = await sportsApi.get<GetSoonMatchesResponse>(
    "/api/v1/client/sport/soon-matches",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function fetchPublicSoonMatches(params: FetchSoonMatchesParams) {
  const response = await sportsApi.get<GetSoonMatchesResponse>(
    "/api/v1/public/sport/soon-matches",
    {
      params,
    }
  );

  return response.data.data;
}
