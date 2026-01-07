import sportsApi from "@/api/sports/sports-api";

import type { GetTeamDetailResponse, GetTeamSummaryResponse } from "./types";

/**
 * Get team detail information
 */
export async function getTeamDetail(params: {
  page: number;
  page_size: number;
  sort_by?: string;
  sort_order?: string;
}) {
  const response = await sportsApi.get<GetTeamDetailResponse>(
    "/api/v1/client/team/detail",
    {
      params: {
        page: params.page,
        page_size: params.page_size,
        sort_by: params.sort_by || "created_at",
        sort_order: params.sort_order || "asc",
      },
    }
  );
  return response.data;
}

/**
 * Get team detail information by user ID
 */
export async function getTeamDetailByUserId(
  userId: string,
  params: {
    page: number;
    page_size: number;
  }
) {
  const response = await sportsApi.get<GetTeamDetailResponse>(
    "/api/v1/inner/team/detail",
    {
      params: {
        user_uid: userId,
        page: params.page,
        page_size: params.page_size,
      },
    }
  );
  return response.data;
}

/**
 * Get team summary information
 */
export async function getTeamSummary() {
  const response = await sportsApi.get<GetTeamSummaryResponse>(
    "/api/v1/client/team/summary"
  );
  return response.data;
}

/**
 * Get team summary information by user ID
 */
export async function getTeamSummaryByUserId(id: string) {
  const response = await sportsApi.get<GetTeamSummaryResponse>(
    `/api/v1/inner/team/summary`,
    {
      params: {
        user_uid: id,
      },
    }
  );
  return response.data;
}
