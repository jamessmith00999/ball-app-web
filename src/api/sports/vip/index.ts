import sportsApi from "@/api/sports/sports-api";

import type { GetVipInfoResponse, GetVipRecordsResponse } from "./types";

/**
 * Get VIP information
 */
export async function getVipInfo() {
  const response = await sportsApi.get<GetVipInfoResponse>(
    "/api/v1/client/vip/info"
  );
  return response.data;
}

/**
 * Get VIP records
 */
export async function getVipRecords() {
  const response = await sportsApi.get<GetVipRecordsResponse>(
    "/api/v1/client/vip/records"
  );
  return response.data;
}

export async function redeemVipPoints(points: number) {
  const response = await sportsApi.post("/api/v1/client/vip/redeem-points", {
    points,
  });
  return response.data;
}
