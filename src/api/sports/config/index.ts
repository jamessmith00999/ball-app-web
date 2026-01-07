import sportsApi from "@/api/sports/sports-api";

import type {
  BannerListResponse,
  GetConfigResponse,
  GetDictResponse,
} from "./types";

// Re-export types for convenience
export type * from "./types";

export async function getDict() {
  const dictResponse = await sportsApi.get<GetDictResponse>(
    "/api/v1/public/dict",
  );
  return dictResponse?.data?.data;
}

export async function getConfig({ lang }: { lang: string }) {
  const configResponse = await sportsApi.get<GetConfigResponse>(
    "/api/v1/public/config",
    {
      params: {
        lang,
      },
    },
  );
  return configResponse?.data?.data;
}

/**
 * Get banner list
 */
export async function getBannerList(): Promise<BannerListResponse> {
  const response = await sportsApi.get("/api/v1/public/banners");
  return response.data;
}
