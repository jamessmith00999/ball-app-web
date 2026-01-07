import sportsApi from "@/api/sports/sports-api";

import type { GetLedgersResponse } from "./types";

// ledgers includes deposits and withdrawals
export async function getLedgers(params: { page: number; page_size: number }) {
  const response = await sportsApi.get<GetLedgersResponse>(
    "/api/v1/client/ledgers",
    {
      params: {
        page: params.page,
        page_size: params.page_size,
      },
    }
  );
  return response.data;
}
