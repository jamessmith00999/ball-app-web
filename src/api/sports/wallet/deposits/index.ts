import sportsApi from "@/api/sports/sports-api";

import type {
  GenerateDepositAddressRequest,
  GenerateDepositAddressResponse,
  GetDepositsResponse,
} from "./types";

export async function generateDepositAddress(
  data: GenerateDepositAddressRequest
) {
  const response = await sportsApi.post<GenerateDepositAddressResponse>(
    "/api/v1/client/deposit/generate-address",
    data
  );
  return response.data;
}

export async function getDeposits(params: { page: number; page_size: number }) {
  const response = await sportsApi.get<GetDepositsResponse>(
    "/api/v1/client/deposits",
    {
      params: {
        page: params.page,
        page_size: params.page_size,
      },
    }
  );
  return response.data;
}
