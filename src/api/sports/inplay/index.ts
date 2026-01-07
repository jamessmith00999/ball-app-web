import type { ApiResponse, Pagination } from "@/api/base-api-type";
import type { Match } from "@/api/sports/matches/types";
import sportsApi from "@/api/sports/sports-api";

export type GetInPlayMatchesResponse = ApiResponse<Pagination<Match>>;

export type CheckInPlayExistsResponse = ApiResponse<
  Record<InPlayMatchesType, boolean>
>;

export type GetSoonMatchesResponse = GetInPlayMatchesResponse;

export type InPlayMatchesType = "1x2" | "hdp" | "o/u" | "other";

export interface FetchInPlayMatchesParams {
  page: number;
  page_size: number;
  type?: InPlayMatchesType;
  sport_id?: number;
}

export type FetchSoonMatchesParams = FetchInPlayMatchesParams;

export async function fetchInPlayMatches(
  params: FetchInPlayMatchesParams,
  token?: string,
) {
  const response = await sportsApi.get<GetInPlayMatchesResponse>(
    "/api/v1/client/sport/inplay-matches",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
}

export async function fetchPublicInPlayMatches(
  params: FetchInPlayMatchesParams,
) {
  const response = await sportsApi.get<GetInPlayMatchesResponse>(
    "/api/v1/public/sport/inplay-matches",
    {
      params,
    },
  );

  return response.data.data;
}

export async function fetchPublicInPlayExists() {
  const response = await sportsApi.get<CheckInPlayExistsResponse>(
    "/api/v1/public/sport/check-inplay-exists",
  );

  return response.data.data;
}

export async function fetchSoonMatches(
  params: FetchSoonMatchesParams,
  token?: string,
) {
  const response = await sportsApi.get<GetSoonMatchesResponse>(
    "/api/v1/client/sport/soon-matches",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
}

export async function fetchPublicSoonMatches(params: FetchSoonMatchesParams) {
  const response = await sportsApi.get<GetSoonMatchesResponse>(
    "/api/v1/public/sport/soon-matches",
    {
      params,
    },
  );

  return response.data.data;
}
