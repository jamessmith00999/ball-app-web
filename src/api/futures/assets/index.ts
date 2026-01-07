import { futuresApi } from "@/api/futures/futures-api";

import type {
  DepositAddressRequest,
  DepositAddressResponse,
  DepositTransactionDetailResponse,
  FrozenDetailsResponse,
  TransactionLogResponse,
  TransferHistoryDetailResponse,
  TransferOutRequest,
  UserAssetResponse,
  WithdrawCodeRequest,
  WithdrawCodeResponse,
  WithdrawRequest,
  WithdrawResponse,
  WithdrawTransactionDetailResponse,
} from "./types";

export * from "./types";

export async function getUserAsset(): Promise<UserAssetResponse> {
  const response =
    await futuresApi.get<UserAssetResponse>("/api/v1/user/asset");
  return response.data;
}

export async function getFrozenDetails(): Promise<FrozenDetailsResponse> {
  const response = await futuresApi.get<FrozenDetailsResponse>(
    "/api/v1/user/asset/frozen/details",
  );
  return response.data;
}

export async function getDepositAddress(
  request: DepositAddressRequest,
): Promise<DepositAddressResponse> {
  const queryParams = new URLSearchParams({
    network_id: request.network_id.toString(),
  });
  const response = await futuresApi.get<DepositAddressResponse>(
    `/api/v1/asset/deposit-address?${queryParams.toString()}`,
  );
  return response.data;
}

export async function sendTradingWithdrawCode(
  request: WithdrawCodeRequest,
): Promise<WithdrawCodeResponse> {
  const response = await futuresApi.post<WithdrawCodeResponse>(
    "/api/v1/asset/withdraw/code",
    request,
  );
  return response.data;
}

export async function withdraw(
  request: WithdrawRequest,
): Promise<WithdrawResponse> {
  const response = await futuresApi.post<WithdrawResponse>(
    "/api/v1/asset/withdraw",
    request,
  );
  return response.data;
}

export async function getTransactionLogs(params: {
  page: number;
  page_size: number;
  type?: "income" | "outcome";
}): Promise<TransactionLogResponse> {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    page_size: params.page_size.toString(),
    ...(params.type ? { type: params.type } : {}),
  });

  const response = await futuresApi.get<TransactionLogResponse>(
    `/api/v1/asset/transaction-logs?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getDepositTransactionByHash(
  hash: string,
): Promise<DepositTransactionDetailResponse> {
  const response = await futuresApi.get<DepositTransactionDetailResponse>(
    `/api/v1/asset/transaction/hash/${hash}`,
  );
  return response.data;
}

export async function getWithdrawTransactionByUid(
  uid: string,
): Promise<WithdrawTransactionDetailResponse> {
  const response = await futuresApi.get<WithdrawTransactionDetailResponse>(
    `/api/v1/asset/withdraw-history/${uid}`,
  );
  return response.data;
}

export async function getTransferHistoryByUid(
  uid: string,
): Promise<TransferHistoryDetailResponse> {
  const response = await futuresApi.get<TransferHistoryDetailResponse>(
    `/api/v1/asset/transfer-history/${uid}`,
  );
  return response.data;
}

export async function transferOutFromExchange(
  request: TransferOutRequest,
): Promise<void> {
  await futuresApi.post("/api/v1/asset/transfer-out", request);
}
