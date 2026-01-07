import { futuresApi } from "@/api/futures/futures-api";

import type {
  GetPositionsParams,
  GetPositionsResponse,
  UpdatePositionRequest,
  UpdatePositionResponse,
  UpdatePositionTpslRequest,
  UpdatePositionTpslResponse,
} from "./types";

export * from "./types";

export async function getPositions(
  params: GetPositionsParams,
): Promise<GetPositionsResponse> {
  const queryParams = new URLSearchParams({
    ...(params.currency_pair ? { currency_pair: params.currency_pair } : {}),
    ...(params.start_date ? { start_date: params.start_date } : {}),
    ...(params.end_date ? { end_date: params.end_date } : {}),
    ...(params.status ? { status: params.status } : {}),
  });

  const response = await futuresApi.get<GetPositionsResponse>(
    `/api/v1/exchange/positions?${queryParams.toString()}`,
  );
  return response.data;
}

export async function updatePosition(
  request: UpdatePositionRequest,
): Promise<UpdatePositionResponse> {
  const response = await futuresApi.post<UpdatePositionResponse>(
    "/api/v1/exchange/position/update",
    request,
  );
  return response.data;
}

export async function updatePositionTpsl(
  request: UpdatePositionTpslRequest,
): Promise<UpdatePositionTpslResponse> {
  const response = await futuresApi.post<UpdatePositionTpslResponse>(
    "/api/v1/exchange/position/update",
    request,
  );
  return response.data;
}
