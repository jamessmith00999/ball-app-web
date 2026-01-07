import { futuresApi } from "@/api/futures/futures-api";

import type {
  BannerListResponse,
  CampaignListResponse,
  MarkCampaignInProgressRequest,
  RewardRecordResponse,
} from "./types";

export * from "./types";

export async function getBanners(): Promise<BannerListResponse> {
  const response = await futuresApi.get<BannerListResponse>(
    "/api/v1/public/banner/list",
  );
  return response.data;
}

export async function getCampaignList(params: {
  platform: "ios" | "android";
}): Promise<CampaignListResponse> {
  const queryParams = new URLSearchParams({
    platform: params.platform,
  });
  const response = await futuresApi.get<CampaignListResponse>(
    "/api/v1/campaign/list?" + queryParams.toString(),
  );
  return response.data;
}

export async function markCampaignInProgress(
  request: MarkCampaignInProgressRequest,
): Promise<void> {
  await futuresApi.post("/api/v1/campaign/mark-in-progress", request);
}

export async function getRewardRecordByUid(
  uid: string,
): Promise<RewardRecordResponse> {
  const response = await futuresApi.get<RewardRecordResponse>(
    `/api/v1/campaign/reward-record/${uid}`,
  );
  return response.data;
}
