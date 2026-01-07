import { futuresApi } from "@/api/futures/futures-api";

import type {
  ClaimRaffleRewardRequest,
  DrawTicketNumberResponse,
  GetRaffleDrawListParams,
  RaffleDrawDetailResponse,
  RaffleDrawListResponse,
  RaffleDrawResponse,
  RaffleRulesResponse,
  TurntableRewardListResponse,
} from "./types";

export * from "./types";

export async function getTurntableRewards(): Promise<TurntableRewardListResponse> {
  const response = await futuresApi.get<TurntableRewardListResponse>(
    "/api/v1/exchange/raffle/list",
  );
  return response.data;
}

export async function getRaffleDrawList(
  params?: GetRaffleDrawListParams,
): Promise<RaffleDrawListResponse> {
  const response = await futuresApi.get<RaffleDrawListResponse>(
    "/api/v1/exchange/raffle/draw",
    {
      params,
    },
  );
  return response.data;
}

export async function getRaffleDrawDetail(
  uid: string,
): Promise<RaffleDrawDetailResponse> {
  const response = await futuresApi.get<RaffleDrawDetailResponse>(
    `/api/v1/exchange/raffle/draw/${uid}`,
  );
  return response.data;
}

export async function claimRaffleReward(
  request: ClaimRaffleRewardRequest,
): Promise<void> {
  await futuresApi.post("/api/v1/exchange/raffle/claim", request);
}

export async function drawRaffle(): Promise<RaffleDrawResponse> {
  const response = await futuresApi.post<RaffleDrawResponse>(
    "/api/v1/exchange/raffle/draw",
    {},
  );
  return response.data;
}

export async function getDrawTicketNumber(): Promise<DrawTicketNumberResponse> {
  const response = await futuresApi.get<DrawTicketNumberResponse>(
    "/api/v1/exchange/raffle/draw-ticket-number",
  );
  return response.data;
}

export async function getRaffleRules(): Promise<RaffleRulesResponse> {
  const response = await futuresApi.get<RaffleRulesResponse>(
    "/api/v1/exchange/raffle/rules",
  );
  return response.data;
}
