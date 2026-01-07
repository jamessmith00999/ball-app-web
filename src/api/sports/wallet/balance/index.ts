import sportsApi from "@/api/sports/sports-api";

import type { GetBalanceResponse } from "./types";

export async function getBalance() {
  const response = await sportsApi.get<GetBalanceResponse>(
    "/api/v1/client/balance"
  );
  return response.data;
}
