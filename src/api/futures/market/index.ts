import { futuresApi } from "@/api/futures/futures-api";

import type { ConstantResponse, ExchangePairResponse, KLineResponse } from "./types";

export * from "./types";

export async function getExchangePairs(): Promise<ExchangePairResponse> {
  const response = await futuresApi.get<ExchangePairResponse>(
    "/api/v1/exchange/public/pair",
  );
  return response.data;
}

export async function getCandlestick(
  symbol: string,
  period: string,
  endTimeInSeconds?: number,
): Promise<KLineResponse> {
  const endTs = endTimeInSeconds || Math.floor(Date.now() / 1000);
  const response = await futuresApi.get<KLineResponse>(
    `/api/v1/exchange/public/candlestick?symbol=${symbol}&period=${period}&limit=1000&end_ts_in_s=${endTs}`,
  );
  return response.data;
}

export async function getConstant(): Promise<ConstantResponse> {
  const response = await futuresApi.get<ConstantResponse>(
    "/api/v1/exchange/public/constant",
  );
  return response.data;
}
