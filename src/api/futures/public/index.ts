import { futuresApi } from "@/api/futures/futures-api";

import type { GetFaqListResponse, GetTermResponse } from "./types";

export * from "./types";

export async function getFaqList(): Promise<GetFaqListResponse> {
  const response = await futuresApi.get<GetFaqListResponse>(
    "/api/v1/exchange/public/faq/list",
  );
  return response.data;
}

export async function getTerm(): Promise<GetTermResponse> {
  const response = await futuresApi.get<GetTermResponse>("/api/v1/public/term");
  return response.data;
}
