import sportsApi from "@/api/sports/sports-api";
import { DEFAULT_CURRENCY_ID } from "@/constants/sports";

import type {
  GetWithdrawalAddressesResponse,
  GetWithdrawalFeeResponse,
  GetWithdrawalsResponse,
  WithdrawalRequest,
} from "./types";

export async function createSportsWithdrawal(data: WithdrawalRequest) {
  const response = await sportsApi.post("/api/v1/client/withdrawals", data);
  return response.data;
}

export async function getWithdrawals(params: {
  page: number;
  page_size: number;
}) {
  const response = await sportsApi.get<GetWithdrawalsResponse>(
    "/api/v1/client/withdrawals",
    {
      params: {
        page: params.page,
        page_size: params.page_size,
      },
    }
  );
  return response.data;
}

export async function getWithdrawalFee(assetId: number = DEFAULT_CURRENCY_ID) {
  const response = await sportsApi.get<GetWithdrawalFeeResponse>(
    "/api/v1/public/withdrawal-fee",
    {
      params: {
        asset_id: assetId,
      },
    }
  );
  return response.data;
}

export async function getWithdrawalAddresses() {
  const response = await sportsApi.get<GetWithdrawalAddressesResponse>(
    "/api/v1/client/withdrawal-addresses"
  );
  return response.data;
}

export async function createWithdrawalAddress(data: {
  address: string;
  network_id: number;
  asset: string;
  asset_id: number;
  remark: string;
}) {
  const response = await sportsApi.post(
    "/api/v1/client/withdrawal-addresses",
    data
  );
  return response.data;
}

export async function deleteWithdrawalAddress(addressUid: string) {
  const response = await sportsApi.delete(
    `/api/v1/client/withdrawal-addresses/${addressUid}`
  );
  return response.data;
}

export async function updateWithdrawalAddress(
  addressUid: string,
  data: {
    address: string;
    network_id: number;
    asset: string;
    asset_id: number;
    remark: string;
  }
) {
  const response = await sportsApi.put(
    `/api/v1/client/withdrawal-addresses/${addressUid}`,
    data
  );
  return response.data;
}

/**
 * Send verification code for withdrawal
 */
export async function sendSportsWithdrawCode(data: {
  method: "email" | "sms";
  lang: string;
}): Promise<void> {
  await sportsApi.post("/api/v1/client/send-code/withdraw", data);
}
