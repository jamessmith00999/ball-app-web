import { futuresApi } from "@/api/futures/futures-api";

import type {
  CommissionDetailResponse,
  CommissionRatesResponse,
  TeamCommissionHistoryResponse,
  TeamInfoResponse,
  TeamListResponse,
  TeamSummaryResponse,
} from "./types";

export * from "./types";

export async function getTeamInfo(): Promise<TeamInfoResponse> {
  const response = await futuresApi.get<TeamInfoResponse>(
    "/api/v1/user/team/info",
  );
  return response.data;
}

export async function getTeamList(params: {
  level_ids?: string;
  user_valid_status?: string;
  page?: number;
  page_size?: number;
}): Promise<TeamListResponse> {
  const queryParams = new URLSearchParams({
    ...(params.level_ids ? { level_ids: params.level_ids } : {}),
    ...(params.user_valid_status
      ? { user_valid_status: params.user_valid_status }
      : {}),
    ...(params.page ? { page: params.page.toString() } : {}),
    ...(params.page_size ? { page_size: params.page_size.toString() } : {}),
  });

  const response = await futuresApi.get<TeamListResponse>(
    `/api/v1/user/team/list?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getTeamCommissionHistory(params: {
  page: number;
  page_size: number;
}): Promise<TeamCommissionHistoryResponse> {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    page_size: params.page_size.toString(),
  });

  const response = await futuresApi.get<TeamCommissionHistoryResponse>(
    `/api/v1/user/team/commission-history?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getCommissionDetail(
  uid: string,
): Promise<CommissionDetailResponse> {
  const response = await futuresApi.get<CommissionDetailResponse>(
    `/api/v1/user/team/commission-history/${uid}`,
  );
  return response.data;
}

export async function getCommissionRates(): Promise<CommissionRatesResponse> {
  const response = await futuresApi.get<CommissionRatesResponse>(
    "/api/v1/user/public/team/commission/rates",
  );
  return response.data;
}

export async function getTeamSummary(params: {
  level_ids?: string;
  user_valid_status?: string;
}): Promise<TeamSummaryResponse> {
  const queryParams = new URLSearchParams({
    ...(params.level_ids ? { level_ids: params.level_ids } : {}),
    ...(params.user_valid_status
      ? { user_valid_status: params.user_valid_status }
      : {}),
  });
  const response = await futuresApi.get<TeamSummaryResponse>(
    `/api/v1/user/team/summary?${queryParams.toString()}`,
  );
  return response.data;
}
