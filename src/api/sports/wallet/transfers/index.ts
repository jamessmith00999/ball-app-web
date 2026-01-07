import type { TransferOutRequest } from "@/api/futures/assets/types";
import sportsApi from "@/api/sports/sports-api";

import type { GetTransfersResponse } from "./types";

export async function getTransfers(params: {
  page: number;
  page_size: number;
}) {
  const response = await sportsApi.get<GetTransfersResponse>(
    "/api/v1/client/transfers",
    {
      params: {
        page: params.page,
        page_size: params.page_size,
      },
    }
  );
  return response.data;
}

export async function transferOutFromSports(
  request: TransferOutRequest
): Promise<void> {
  await sportsApi.post("/api/v1/client/transfer-out", request);
}
